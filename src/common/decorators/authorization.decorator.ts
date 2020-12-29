import { SetMetadata } from '@nestjs/common';

/**
 * decorator to do endpoints totatlly publics
 */
export const IS_PUBLIC = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC, true);

/**
 * defines if the operation is only for a own profile change
 */
export const OWN_PROFILE_CHAGNES = 'ownProfileChanges';
export const OwnProfileChanges = () => SetMetadata(OWN_PROFILE_CHAGNES, true);

/**
 * defines the roles of the endpoint
 */
export const USER_ROLES = 'Allowed_Roles';
export const ROLE_SUPER_ADMIN = 'SUPERADMIN';
export const ROLE_ADMIN = 'ADMIN';
export const ROLE_CLIENT = 'CLIENT';
export const ALL_ROLES = [ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_CLIENT];
export const AllowedRoles = (...roles: string[]) =>
  SetMetadata(USER_ROLES, roles);
