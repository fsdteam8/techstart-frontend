import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ProductDetailsTabContainer = () => {
  return (
    <Tabs className="mt-5">
      <TabsList variant="outline">
        <TabsTrigger value="description" variant="outline">
          Description
        </TabsTrigger>
        <TabsTrigger value="desclaimer" variant="outline">
          Disclaimers and Disclosures
        </TabsTrigger>
        <TabsTrigger value="reviews" variant="outline">
          Reviews
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description"></TabsContent>
      <TabsContent value="desclaimer"></TabsContent>
      <TabsContent value="reviews"></TabsContent>
    </Tabs>
  );
};

export default ProductDetailsTabContainer;
