import React from "react";

const EmptyState = ({ label, children, helperText = "Click below to continue ↙" }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed py-6">
      <p className="text-sm font-medium dark:text-white">{label}</p>
      <p className="text-sm text-gray-500">{helperText}</p>
      {children}
    </div>
  );
};

export default EmptyState;
