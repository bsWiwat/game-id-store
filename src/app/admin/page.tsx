import { redirect } from "next/navigation";

export default function AdminHome() {
  redirect("/admin/dashboard"); // ให้ไปที่หน้า Dashboard
  return null;
}
