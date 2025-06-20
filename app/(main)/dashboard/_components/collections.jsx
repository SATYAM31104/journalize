"use client";

import React, { useState, useEffect } from "react";
import { createCollection } from "@/actions/collection";
import { toast } from "sonner";
import CollectionPreview from "./collection-preview";
import CollectionForm from "@/components/collection-form";
import useFetch from "@/hooks/use-fetch";

const Collections = ({ collections = [], entriesByCollection = {} }) => {
  const [isCollectionDialogOpen, setIsCollectionDialogOpen] = useState(false);

  const {
    loading: createCollectionLoading,
    fn: createCollectionFn,
    data: createdCollection,
  } = useFetch(createCollection);

  useEffect(() => {
    if (createdCollection) {
      setIsCollectionDialogOpen(false);
      toast.success(`Collection "${createdCollection.name}" created!`);
      // You may add a refresh here if needed.
    }
  }, [createdCollection]);

  // ✅ This was missing
  const handleCreateCollection = (data) => {
    createCollectionFn(data);
  };

  // Optional: filter out 'unorganized' from collections if it exists
  const filteredCollections = collections.filter(
    (collection) => collection.id !== "unorganized"
  );

  if (filteredCollections.length === 0 && !entriesByCollection.unorganized)
    return null;

  return (
    <section id="collections" className="space-y-6">
      <h2 className="text-3xl font-bold gradient-title">Collections</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create New Collection */}
        <CollectionPreview
          isCreateNew
          onCreateNew={() => setIsCollectionDialogOpen(true)}
        />

        {/* Unorganized Collection */}
        {entriesByCollection?.unorganized?.length > 0 && (
          <CollectionPreview
            key="unorganized"
            name="Unorganized"
            id="unorganized"
            entries={entriesByCollection.unorganized}
            isUnorganized
          />
        )}

        {/* User Collections */}
        {filteredCollections.map((collection) => (
          <CollectionPreview
            key={collection.id}
            id={collection.id}
            name={collection.name}
            entries={entriesByCollection[collection.id] || []}
          />
        ))}
      </div>

      {/* Collection Dialog */}
      <CollectionForm
        loading={createCollectionLoading}
        onSuccess={handleCreateCollection}
        open={isCollectionDialogOpen}
        setOpen={setIsCollectionDialogOpen}
      />
    </section>
  );
};

export default Collections;