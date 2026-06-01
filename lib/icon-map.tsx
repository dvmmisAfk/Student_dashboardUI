import {
  Code2, Layers, Zap, Database, BookOpen, Brain, Globe, Rocket,
  Star, Terminal, Shield, BarChart2, Cpu, Network, Atom, FlaskConical,
  BotMessageSquare, CircuitBoard, Binary, Boxes, type LucideProps,
} from "lucide-react";
import { ComponentType } from "react";

const iconMap: Record<string, ComponentType<LucideProps>> = {
  Code2, Layers, Zap, Database, BookOpen, Brain, Globe, Rocket,
  Star, Terminal, Shield, BarChart2, Cpu, Network, Atom,
  FlaskConical, BotMessageSquare, CircuitBoard, Binary, Boxes,
};

export function getIcon(name: string): ComponentType<LucideProps> {
  return iconMap[name] ?? Brain;
}
