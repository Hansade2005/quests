import { AIProviderIcon } from "@/components/ai-provider-icon";
import { SORTED_PROVIDERS } from "@/lib/provider-metadata";

export function SupportedProviders() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-muted-foreground">Supported providers</p>
      <div className="flex flex-wrap justify-center gap-3">
        {SORTED_PROVIDERS.map(({ name, type }) => (
          <div className="flex items-center gap-2" key={type}>
            <AIProviderIcon className="size-4 opacity-60" type={type} />
            <span className="text-xs text-muted-foreground">{name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
