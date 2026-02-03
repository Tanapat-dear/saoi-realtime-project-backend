import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common"; // เพิ่ม ForbiddenException
import { Reflector } from "@nestjs/core";
import { Role } from "./roles.enum";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    // ตรวจสอบว่า user มี role ตรงกับที่กำหนดไว้หรือไม่
    // ใช้ user.role === role เพราะ payload ของคุณส่งมาเป็น string ตัวเดียว
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      // --- CUSTOM MESSAGE ตรงนี้ ---
      throw new ForbiddenException({
        success: false,
        message: 'You do not have permission to access this management section.',
        error: 'Forbidden Resource',
        statusCode: 403
      });
    }

    return true;
  }
}