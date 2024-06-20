import { DrawerItem } from "@/types/common";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
type IProps = {
  item: DrawerItem;
  index: number;
};

const SideBarItems = ({ item, index }: IProps) => {
  const linkPath = `/dashboard/${item.path}`;
  const pathName = usePathname();
  // console.log(pathName);
  return (
    <Link href={linkPath}>
      <ListItem
        sx={{
          transition: "background 0.3s, border-right 0.3s",
          ...(pathName === linkPath
            ? { borderRight: "3px solid #0891B2", background: "#059669" }
            : {}),
        }}
        disablePadding
        key={index}
      >
        <ListItemButton
          sx={{
            transition: "color 0.3s",
            color: pathName === linkPath ? "#fff" : "inherit",
          }}
        >
          <ListItemIcon
            sx={{
              transition: "color 0.3s",
              color: pathName === linkPath ? "#fff" : "inherit",
            }}
          >
            {item.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              sx: {
                transition: "color 0.3s",
                color: pathName === linkPath ? "#fff" : "inherit",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SideBarItems;
