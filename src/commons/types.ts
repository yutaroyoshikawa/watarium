import { TransitionStatus } from "react-transition-group/Transition";

export type Labels =
  | "スケジュール"
  | "展覧会"
  | "メンバーシップ"
  | "ワタリウム美術館について"
  | "トップ";

export type Urls = "schedule" | "exhibitions" | "membership" | "about" | "";

export interface TransitionProp {
  transitionStatus: TransitionStatus;
  duration: number;
};

export interface PostData {
  id: string;
  title: string;
  subtitle?: string;
  sumbnail: string;
  overview: string;
  start: Date;
  finish: Date;
};

export interface StyledWrapProp extends TransitionProp {
  isActiveCalendar: boolean;
}
