export interface MenuItem {
  id: number | string;
  path: string;
  name: string;
  component: string;
  meta: {
    title: string;
    icon?: string;
  };
  children?: MenuItem[];
}