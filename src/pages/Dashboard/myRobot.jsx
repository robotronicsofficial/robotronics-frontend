import { useMemo } from "react";
import { Bot, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import Intro from "@/components/site/dashboard/intro";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading, Text } from "@/components/ui/typography";
import { getCommerceItemRoute } from "../../lib/commerceItems";
import { resolveBackendAssetUrl } from "../../utils/mediaUrl";
import {
  useRemoveSavedItemMutation,
  useSavedItems,
} from "../../hooks/useSavedItems";
import { useFormatMoney } from "@/utils/formatPrice";

const SavedItemRow = ({ item, onView, onRemove }) => {
  const formatMoney = useFormatMoney();
  return (
  <Card>
    <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
      <button
        type="button"
        onClick={() => onView(item)}
        className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted"
      >
        <img
          src={resolveBackendAssetUrl(
            item?.image || item?.images?.[0],
            "https://via.placeholder.com/160",
          )}
          className="size-full object-cover"
          alt={item?.name || "Saved item"}
        />
      </button>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <button
          type="button"
          onClick={() => onView(item)}
          className="text-left text-body font-semibold text-foreground hover:text-primary"
        >
          {item?.name || "Saved item"}
        </button>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-caption text-muted-foreground">
          <span>Category: {item?.category || "General"}</span>
          <span>Type: {item?.itemType || "item"}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-2">
        <Text size="sm" weight="semibold" className="text-foreground">
          {formatMoney(item?.price)}
        </Text>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={() => onView(item)}
            size="sm"
            className="rounded-full"
          >
            {item?.itemType === "course" ? "View course" : "View product"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onRemove(item)}
            className="text-muted-foreground hover:text-destructive"
            aria-label={`Remove ${item?.name || "item"}`}
          >
            <X className="size-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
  );
};

const MyRobot = () => {
  const navigate = useNavigate();
  const {
    data: items = [],
    isLoading,
    error,
  } = useSavedItems();
  const removeSavedItemMutation = useRemoveSavedItemMutation();
  const formatMoney = useFormatMoney();

  const totalValue = useMemo(
    () => items.reduce((sum, item) => sum + Number(item?.price || 0), 0),
    [items],
  );

  const handleRemove = async (item) => {
    try {
      await removeSavedItemMutation.mutateAsync(item);
    } catch (err) {
      console.error("Failed to remove saved item:", err);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <Container size="wide">
        <Intro />
      </Container>
      <section className="bg-background pb-12 md:pb-16">
        <Container size="wide">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              <Eyebrow>Saved for later</Eyebrow>
              <Heading level={1} className="text-display-md">
                My saved items
              </Heading>
              <Text size="lg" tone="muted" className="max-w-2xl">
                Items you saved for later from the live catalog.
              </Text>
            </div>
            <div className="rounded-xl border border-border bg-card px-4 py-3 text-body-sm text-foreground">
              <span className="text-muted-foreground">Saved:</span>{" "}
              <span className="font-semibold">{items.length}</span>
              <span className="mx-2 text-muted-foreground">·</span>
              <span className="text-muted-foreground">Value:</span>{" "}
              <span className="font-semibold">{formatMoney(totalValue)}</span>
            </div>
          </div>
        </Container>
      </section>

      <DashboardLayout contentClassName="px-6">
        {isLoading ? (
          <Text tone="muted">Loading saved items…</Text>
        ) : error ? (
          <Alert variant="destructive" className="max-w-md">
            <AlertDescription>{error.message}</AlertDescription>
          </Alert>
        ) : items.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-start gap-4 py-10">
              <Bot aria-hidden="true" className="size-12 text-muted-foreground" />
              <Text tone="muted" className="max-w-md">
                Nothing saved yet. Tap the bookmark on any robot or course you want to come back to — we&apos;ll keep it here.
              </Text>
              <Button
                type="button"
                size="marketing"
                onClick={() => navigate({ to: "/shop" })}
              >
                Browse products
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((item) => (
              <SavedItemRow
                key={`${item.itemType}:${item.itemId}`}
                item={item}
                onView={(it) => navigate({ to: getCommerceItemRoute(it) })}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default MyRobot;
