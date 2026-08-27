import {
  ChemicalIcon,
  ElectricalIcon,
  FlashFireIcon,
  HighVisibilityIcon,
  type IconProps,
} from "@/components/ui/icons";
import type { ProtectionId } from "@/types";

const map: Record<ProtectionId, (props: IconProps) => React.JSX.Element> = {
  chemical: ChemicalIcon,
  electrical: ElectricalIcon,
  "flash-fire": FlashFireIcon,
  "high-visibility": HighVisibilityIcon,
};

export function ProtectionIcon({
  id,
  ...props
}: IconProps & { readonly id: ProtectionId }) {
  const Icon = map[id];
  return <Icon {...props} />;
}
