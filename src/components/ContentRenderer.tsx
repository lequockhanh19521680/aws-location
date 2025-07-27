// src/components/ContentRenderer.tsx
import { Suspense, lazy } from "react";
import { CircularProgress } from "@mui/material";

const formatComponentName = (label: string): string =>
  label
    .replace(/[^\w\s]/g, "") // loại bỏ ký tự đặc biệt
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join("");

export const ContentRenderer = ({ selected }: { selected: string }) => {
  if (!selected) return <p>Vui lòng chọn một mục bên trái.</p>;

  try {
    const name = formatComponentName(selected);
    const Component = lazy(() => import(`../pages/${name}`));

    return (
      <Suspense fallback={<CircularProgress />}>
        <Component />
      </Suspense>
    );
  } catch (error) {
    return <p>Không tìm thấy nội dung cho: {selected}</p>;
  }
};
