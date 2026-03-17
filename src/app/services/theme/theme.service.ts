import {DOCUMENT} from '@angular/common';
import {Inject, Injectable} from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    private readonly storageKey = 'theme-mode';
    private readonly darkClassName = 'app-dark';
    private currentTheme: ThemeMode = 'light';

    constructor(@Inject(DOCUMENT) private readonly document: Document) {
        this.currentTheme = this.getInitialTheme();
        this.applyTheme(this.currentTheme);
    }

    get isDarkMode(): boolean {
        return this.currentTheme === 'dark';
    }

    toggleDarkMode(enabled: boolean): void {
        const nextTheme: ThemeMode = enabled ? 'dark' : 'light';

        if (nextTheme === this.currentTheme) {
            return;
        }

        this.currentTheme = nextTheme;
        this.applyTheme(nextTheme);
        localStorage.setItem(this.storageKey, nextTheme);
    }

    private getInitialTheme(): ThemeMode {
        const savedTheme = localStorage.getItem(this.storageKey);

        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        return globalThis.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    private applyTheme(theme: ThemeMode): void {
        this.document.documentElement.classList.toggle(this.darkClassName, theme === 'dark');
    }
}
