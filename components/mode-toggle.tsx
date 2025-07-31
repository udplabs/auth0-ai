'use client';

import { Check, Moon, Settings, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';

export function ModeToggle({ className, variant = 'toggle' }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (variant === 'dropdown') {
    return (
      <DropdownMenu>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent align="end">Change Theme</TooltipContent>
        </Tooltip>
        <DropdownMenuContent align="end">
          <DropdownMenuRadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value)}
          >
            <DropdownMenuRadioItem
              value="light"
              className="flex justify-between"
              indicator={<Check />}
            >
              <Sun className="h-4 w-4 rotate-0 transition-all dark:-rotate-90" />
              Light
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="dark"
              className="flex justify-between"
              indicator={<Check />}
            >
              <Moon className="h-4 w-4 rotate-90 transition-all dark:rotate-0" />
              Dark
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="system"
              className="flex justify-between"
              indicator={<Check />}
            >
              <Settings className="h-4 w-4 rotate-90 transition-all dark:rotate-0" />
              System
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <ToggleGroup
      {...{
        variant: 'outline',
        value: theme,
        onValueChange: (value: string) => value && setTheme(value),
        type: 'single',
        className,
      }}
    >
      <ToggleGroupItem value="light" aria-label="Toggle light theme">
        <Sun className="h-4 w-4 rotate-0 transition-all dark:-rotate-90" />
      </ToggleGroupItem>
      <ToggleGroupItem value="dark" aria-label="Toggle dark theme">
        <Moon className="h-4 w-4 rotate-90 transition-all dark:rotate-0" />
      </ToggleGroupItem>
      <ToggleGroupItem value="system" aria-label="Toggle system theme">
        <Settings className="h-4 w-4 rotate-90 transition-all dark:rotate-0" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

interface ModeToggleProps {
  className?: string;
  variant?: 'toggle' | 'dropdown';
}
