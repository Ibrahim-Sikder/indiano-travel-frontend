import { USER_ROLE } from "@/constant/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type userRole = keyof typeof USER_ROLE;

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: DrawerItem[];
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  success: boolean;
  message: string;
  error: any;
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export const DEPARTMENT = ["content", "hotel", "restaurant"];
export const Gender = ["male", "female", "others"];
export const Role = ["admin", "editor", "manager"];
export const tags = [
  "delhi",
  "new delhi",
  "delhi tourism",
  "historical delhi",
  "delhi cuisine",
  "delhi markets",
  "delhi temples",
  "delhi monuments",
  "red fort delhi",
  "qutub minar delhi",
  "delhi culture",
  "delhi travel guide",
];
