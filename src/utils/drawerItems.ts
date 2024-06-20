import { USER_ROLE } from "@/constant/role";
import { DrawerItem, userRole } from "@/types/common";
import {
  Apartment,
  BorderColor,
  Dashboard,
  DomainAdd,
  DriveFileRenameOutline,
  Group,
  Hotel,
  LocationCity,
} from "@mui/icons-material";

export const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.SUPER_ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `super_admin`,
          icon: Dashboard,
        },

        {
          title: "Users Management",
          path: `super_admin/users`,
          icon: Group,
        },
        {
          title: "State Management",
          path: `super_admin/state`,
          icon: DomainAdd,
        },
        {
          title: "City Management",
          path: `super_admin/city`,
          icon: LocationCity,
        },
        {
          title: "Place Management",
          path: `super_admin/place`,
          icon: Apartment,
        },
        {
          title: "Content",
          path: `super_admin/content`,
          icon: DriveFileRenameOutline,
        }
      );
      break;
    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: Dashboard,
        },
        {
          title: "Users",
          path: `${role}/users`,
          icon: BorderColor,
        }
      );
      break;
    case USER_ROLE.MANAGER:
      roleMenus.push(
        {
          title: "Dashboard",
          path: `${role}`,
          icon: Dashboard,
        },
        {
          title: "Content",
          path: `${role}/content`,
          icon: BorderColor,
        },
        {
          title: "Hotel",
          path: `${role}/hotel`,
          icon: Hotel,
        }
      );
      break;

    default:
      break;
  }

  return [...roleMenus];
};
