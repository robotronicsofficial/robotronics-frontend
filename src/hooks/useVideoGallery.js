import { useQuery } from "@tanstack/react-query";
import { fetchVideoGallery } from "../lib/videoGallery";
import { queryKeys } from "../lib/queryKeys";

export const useVideoGallery = () =>
  useQuery({
    queryKey: queryKeys.videoGallery.all,
    queryFn: fetchVideoGallery,
  });
