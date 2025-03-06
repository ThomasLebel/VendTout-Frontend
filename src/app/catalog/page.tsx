"use client";

import { Suspense } from "react";
import CatalogContent from "@/components/catalog/CatalogContent";

const Catalog = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CatalogContent />
    </Suspense>
  );
};

export default Catalog;