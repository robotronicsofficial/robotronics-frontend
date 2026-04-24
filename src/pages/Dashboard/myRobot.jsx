import { useMemo } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Intro from "../../component/dashboard/intro";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getCommerceItemRoute } from "../../lib/commerceItems";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import {
  useRemoveSavedItemMutation,
  useSavedItems,
} from "../../hooks/useSavedItems";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const MyRobot = () => {
  const navigate = useNavigate();
  const {
    data: items = [],
    isLoading: loading,
    error,
  } = useSavedItems();
  const removeSavedItemMutation = useRemoveSavedItemMutation();

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + Number(item?.price || 0), 0),
    [items]
  );

  const handleRemove = async (item) => {
    try {
      await removeSavedItemMutation.mutateAsync(item);
    } catch (removeError) {
      console.error("Failed to remove saved item:", removeError);
    }
  };

  return (
    <div className="bg-background min-h-screen" data-aos="fade-up">
      <div className="px-4 md:px-20">
        <Intro />
      </div>

      <DashboardLayout
        className="block min-h-0 bg-background lg:flex"
        contentClassName="w-full py-10 p-0"
        headerOffsetVariant="dashboardWide"
        navClassName="lg:w-1/3 w-2/3"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 px-8 lg:px-14">
          <div>
            <h1 className="text-foreground poppins-bold lg:text-2xl text-base">My Saved Items</h1>
            <p className="text-sm text-muted-foreground">Items you saved for later from the live catalog.</p>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground">
            Saved items: <span className="font-bold">{items.length}</span> · Value: <span className="font-bold">PKR {Number(totalValue || 0).toLocaleString()}</span>
          </div>
        </div>

        {loading ? (
          <div className="px-8 lg:px-14 py-12 text-foreground">Loading saved items...</div>
        ) : error ? (
          <div className="px-8 py-12 lg:px-14">
            <Alert variant="destructive" className="max-w-md">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-start gap-4 px-8 py-12 text-foreground lg:px-14">
            <p>No saved items yet.</p>
            <Button
              type="button"
              onClick={() => navigate("/shop")}
              className="h-auto rounded-lg bg-foreground px-5 py-3 font-semibold text-primary"
            >
              Browse products
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 px-8 lg:px-14">
            {items.map((item) => (
              <Card key={`${item.itemType}:${item.itemId}`}>
                <CardContent className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center gap-5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(item)}
                      className="text-muted-foreground hover:bg-transparent hover:text-destructive"
                      aria-label={`Remove ${item.name || "item"} from saved items`}
                    >
                      <X />
                    </Button>
                    <Button type="button" variant="ghost" className="h-auto p-0" onClick={() => navigate(getCommerceItemRoute(item))}>
                      <img
                        src={resolveBackendAssetUrl(item?.image || item?.images?.[0], "https://via.placeholder.com/160")}
                        className="h-20 w-20 rounded-xl object-cover"
                        alt={item?.name || "Item"}
                      />
                    </Button>
                    <div className="flex flex-col gap-2">
                      <Button
                        type="button"
                        variant="link"
                        onClick={() => navigate(getCommerceItemRoute(item))}
                        className="h-auto justify-start p-0 text-left text-xl font-bold text-foreground"
                      >
                        {item?.name || "Item"}
                      </Button>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <span>Category: {item?.category || "General"}</span>
                        <span>Type: {item?.itemType || "item"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-3 lg:items-end">
                    <p className="text-xl font-bold text-foreground">PKR {Number(item?.price || 0).toLocaleString()}</p>
                    <Button
                      type="button"
                      onClick={() => navigate(getCommerceItemRoute(item))}
                      className="h-auto rounded-lg bg-warning px-4 py-2 font-semibold text-background"
                    >
                      {item?.itemType === "course" ? "View course" : "View product"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default MyRobot;
