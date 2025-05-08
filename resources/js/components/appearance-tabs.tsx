import { Appearance, useAppearance } from '@/hooks/use-appearance';
import { cn } from '@/lib/utils';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';
import { useSidebar } from '@/components/ui/sidebar';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();
    const { state } = useSidebar(); // "expanded" or "collapsed"

    const tabs: { value: Appearance; icon: LucideIcon }[] = [
        { value: 'light', icon: Sun },
        { value: 'dark', icon: Moon },
        { value: 'system', icon: Monitor },
    ];

    if (state === 'collapsed') {
        // Mostrar solo el activo
        const Icon = tabs.find((t) => t.value === appearance)?.icon;
        return (
            <div
                className={cn(
                    'inline-flex items-center justify-center rounded-md bg-neutral-100 p-2 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300',
                    className
                )}
                {...props}
            >
                {Icon && <Icon className="h-4 w-4" />}
            </div>
        );
    }

    // Mostrar todos cuando está expandido
    return (
        <div
            className={cn(
                'inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800',
                className
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex-1 flex items-center justify-center rounded-md px-3.5 py-1.5 transition-colors',
                        appearance === value
                            ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                            : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                </button>
            ))}
        </div>
    );
}
