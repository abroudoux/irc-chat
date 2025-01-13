import { cn } from "@/lib/utils";
import { SectionLayoutProps } from "@/utils/interfaces";

export default function SectionLayout(props: SectionLayoutProps) {
  return (
    <section className={cn("p-4 overflow-hidden", props.className)}>
      {props.children}
    </section>
  );
}
