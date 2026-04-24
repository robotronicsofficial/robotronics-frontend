import { Button } from "@/components/ui/button";

const BoToBtn = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <Button
      type="button"
      variant="outline"
      onClick={goToTop}
      className="fixed bottom-10 right-5 z-floating flex h-16 w-8 cursor-pointer items-center justify-center rounded-3xl border-4 border-primary lg:bottom-40 lg:right-10 lg:h-20 lg:w-10"
      aria-label="Scroll to top"
    >
      <span className="h-6 lg:h-8">
        <span className="mx-2 block h-2 w-0 rounded-3xl border-4 border-primary lg:mx-3 lg:h-3" />
      </span>
    </Button>
  );
};

export default BoToBtn;
