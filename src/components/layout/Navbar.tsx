"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/toogle-theme";
import {
  Menu,
  Home,
  Info,
  Star,
  FileText,
  Mail,
  Play,
  ArrowRight,
} from "lucide-react";

// Navigation links array with icons
const navigationLinks = [
  { href: "/", label: "Homepage", active: true, icon: Home },
  { href: "/about", label: "About us", icon: Info },
  { href: "/features", label: "Features", icon: Star },
  { href: "/posts", label: "All Posts", icon: FileText },
  { href: "/contact", label: "Contact us", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900"
      role="banner"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="Beyond UI Blog - Go to homepage"
          >
            <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
              <span
                className="text-white dark:text-black font-bold text-sm"
                aria-hidden="true"
              >
                B
              </span>
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">
              Beyond UI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  link.active
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300"
                }`}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/demo" aria-label="View demo">
                Demo
              </Link>
            </Button>
            <Button
              size="sm"
              className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              asChild
            >
              <Link href="/get-started" aria-label="Get started with Beyond UI">
                Get Started
              </Link>
            </Button>
            <ModeToggle />
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open mobile navigation menu"
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[350px] px-0"
                aria-labelledby="mobile-menu-heading"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="px-6 py-4 border-b bg-gray-50 dark:bg-gray-800/50">
                    <Link
                      href="/"
                      className="flex items-center gap-3"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                        <span className="text-white dark:text-black font-bold text-lg">
                          B
                        </span>
                      </div>
                      <span className="font-bold text-xl text-gray-900 dark:text-white">
                        Beyond UI
                      </span>
                    </Link>
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex-1 px-4 py-6">
                    <div className="space-y-1">
                      {navigationLinks.map((link) => {
                        const IconComponent = link.icon;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                              link.active
                                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600"
                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                            }`}
                            onClick={() => setIsOpen(false)}
                          >
                            <IconComponent className="h-5 w-5" />
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </nav>

                  {/* Mobile CTA Section */}
                  <div className="px-4 py-6 border-t bg-gray-50 dark:bg-gray-800/50">
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="w-full justify-center gap-2"
                      >
                        <Link href="/demo" onClick={() => setIsOpen(false)}>
                          <Play className="h-4 w-4" />
                          View Demo
                        </Link>
                      </Button>
                      <Button
                        size="lg"
                        className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 justify-center gap-2"
                        asChild
                      >
                        <Link
                          href="/get-started"
                          onClick={() => setIsOpen(false)}
                        >
                          Get Started
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
