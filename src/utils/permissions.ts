type Role = "admin" | "merchant" | "user";

type Permissions = {
  tasks: {
    action: "view" | "accept" | "complete";
  };
  messages: {
    action: "send";
  };
  users: {
    action: "manage";
  };
};

type PermissionCheck<Action extends string> =
  | boolean
  | ((user: User, data?: any) => boolean);

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]["action"]]: PermissionCheck<Action>;
    }>;
  }>;
};

export const ROLES: RolesWithPermissions = {
  admin: {
    tasks: {
      view: true,
      accept: true,
      complete: true,
    },
    messages: {
      send: true,
    },
    users: {
      manage: true,
    },
  },
  merchant: {
    tasks: {
      view: true,
      accept: true,
      complete: true,
    },
    messages: {
      send: true,
    },
  },
  user: {
    tasks: {
      view: true,
    },
    messages: {
      send: true,
    },
  },
};

export type User = { id: string; roles: Role[] };

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]["action"],
  data?: any
): boolean {
  return user.roles.some((role) => {
    const permission = ROLES[role]?.[resource]?.[action];
    if (permission == null) return false;

    if (typeof permission === "boolean") return permission;
    return permission(user, data);
  });
}
