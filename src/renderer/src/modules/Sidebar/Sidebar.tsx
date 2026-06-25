import { DefaultView } from "@renderer/types";
import {
  CheckSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  Home,
  Layout,
  Search,
  Settings,
} from "lucide-react";
import { useState } from "react";
import logo_meteor from "../../assets/logo_meteor_blue.png";

interface SidebarProps {
  activeView: DefaultView;
  onViewChange: (view: DefaultView) => void;
}

const navItems: { id: DefaultView; label: string; icon: React.ElementType }[] =
  [
    { id: "home", label: "Home", icon: Home },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "scrum", label: "Scrum", icon: Layout },
  ];

const Sidebar = ({ activeView, onViewChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className="relative z-10 flex flex-col  transition-all duration-300 ease-out m-4 mr-0">
      <div className="flex flex-col h-full rounded-2xl glass-light overflow-hidden">
        <div className="flex items-center gap-2.5 px-3 h-[60px] border-b border-white/[0.06] ">
          <div className="flex items-center justify-center size-12 drop-shadow-[0_0_12px_rgba(37,99,235,0.4)]">
            <img alt="logo" className="logo" src={logo_meteor} />
          </div>

          {!collapsed && (
            <span className="text-sm font-medium text-meteor-text tracking-tight flex-1">
              Meteor Notes
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center w-7 h-7 rounded-full text-meteor-muted hover:text-meteor-text hover:bg-white/[0.06] transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={[
                    "flex items-center gap-2.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-meteor-primary text-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                      : "text-meteor-muted hover:text-meteor-text hover:bg-white/[0.06]",
                  ].join(" ")}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    size={16}
                    className={
                      isActive
                        ? "text-white"
                        : "text-meteor-muted group-hover:text-meteor-text"
                    }
                  />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              );
            })}
          </div>

          {/* Tools section */}
          {!collapsed && (
            <div className="mt-5 mb-2 px-3">
              <span className="text-[10px] font-medium uppercase tracking-widest text-meteor-muted">
                Tools
              </span>
            </div>
          )}
          {collapsed && <div className="mt-5" />}
          <div className="flex flex-col gap-1 px-2">
            <button
              className="flex items-center gap-2.5 px-3 py-2 rounded-full text-sm font-medium text-meteor-muted hover:text-meteor-text hover:bg-white/[0.06] transition-all duration-200 group"
              title={collapsed ? "Search" : undefined}
            >
              <Search
                size={16}
                className="text-meteor-muted group-hover:text-meteor-text"
              />
              {!collapsed && <span>Search</span>}
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/[0.06] py-3 px-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-meteor-primary to-blue-400 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-meteor-primary/30 shrink-0">
            LD
          </div>
          {!collapsed && (
            <>
              <span className="text-xs text-meteor-text font-medium flex-1 truncate">
                LuisDev
              </span>
              <button className="w-7 h-7 rounded-full flex items-center justify-center text-meteor-muted hover:text-meteor-text hover:bg-white/[0.06] transition-colors">
                <Settings size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
