"use client";

import { createContext, useCallback, useContext, useMemo, useReducer } from "react";
import type {
  EducationItem,
  ExperienceItem,
  PortfolioItem,
  Profile,
  ProjectItem,
  ResumeData,
  SocialLinks,
} from "@/lib/schema";

type ListKey = "education" | "projects" | "experience" | "portfolio";
type ListItemMap = {
  education: EducationItem;
  projects: ProjectItem;
  experience: ExperienceItem;
  portfolio: PortfolioItem;
};

type Action =
  | { type: "updateProfile"; patch: Partial<Profile> }
  | { type: "listAdd"; key: ListKey; item: ListItemMap[ListKey] }
  | { type: "listUpdate"; key: ListKey; id: string; patch: Partial<ListItemMap[ListKey]> }
  | { type: "listRemove"; key: ListKey; id: string }
  | { type: "setSkills"; skills: string[] }
  | { type: "updateSocials"; patch: Partial<SocialLinks> }
  | { type: "toggleSection"; sectionId: string }
  | { type: "setResume"; data: ResumeData };

function reducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case "updateProfile":
      return { ...state, profile: { ...state.profile, ...action.patch } };
    case "listAdd":
      return {
        ...state,
        [action.key]: [...(state[action.key] as Array<{ id: string }>), action.item],
      };
    case "listUpdate":
      return {
        ...state,
        [action.key]: (state[action.key] as Array<{ id: string }>).map((item) =>
          item.id === action.id ? { ...item, ...action.patch } : item,
        ),
      };
    case "listRemove":
      return {
        ...state,
        [action.key]: (state[action.key] as Array<{ id: string }>).filter(
          (item) => item.id !== action.id,
        ),
      };
    case "setSkills":
      return { ...state, skills: action.skills };
    case "updateSocials":
      return { ...state, socials: { ...state.socials, ...action.patch } };
    case "toggleSection": {
      const current = state.hiddenSections ?? [];
      const next = current.includes(action.sectionId)
        ? current.filter((id) => id !== action.sectionId)
        : [...current, action.sectionId];
      return { ...state, hiddenSections: next };
    }
    case "setResume":
      return action.data;
    default:
      return state;
  }
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2, 10);
}

interface ContextValue {
  data: ResumeData;
  updateProfile: (patch: Partial<Profile>) => void;
  addEducation: (init?: Partial<Omit<EducationItem, "id">>) => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  addProject: (init?: Partial<Omit<ProjectItem, "id">>) => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;
  addExperience: (init?: Partial<Omit<ExperienceItem, "id">>) => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;
  addPortfolio: (init?: Partial<Omit<PortfolioItem, "id">>) => void;
  updatePortfolio: (id: string, patch: Partial<PortfolioItem>) => void;
  removePortfolio: (id: string) => void;
  setSkills: (skills: string[]) => void;
  updateSocials: (patch: Partial<SocialLinks>) => void;
  toggleSection: (sectionId: string) => void;
  setResume: (data: ResumeData) => void;
}

const ResumeDataContext = createContext<ContextValue | null>(null);

interface ProviderProps {
  children: React.ReactNode;
  initialData: ResumeData;
}

export function ResumeDataProvider({ children, initialData }: ProviderProps) {
  const [data, dispatch] = useReducer(reducer, initialData);

  const updateProfile = useCallback(
    (patch: Partial<Profile>) => dispatch({ type: "updateProfile", patch }),
    [],
  );

  const addEducation = useCallback(
    (init: Partial<Omit<EducationItem, "id">> = {}) =>
      dispatch({
        type: "listAdd",
        key: "education",
        item: {
          id: makeId(),
          school: "",
          major: "",
          startDate: "",
          endDate: "",
          description: "",
          ...init,
        },
      }),
    [],
  );
  const updateEducation = useCallback(
    (id: string, patch: Partial<EducationItem>) =>
      dispatch({ type: "listUpdate", key: "education", id, patch }),
    [],
  );
  const removeEducation = useCallback(
    (id: string) => dispatch({ type: "listRemove", key: "education", id }),
    [],
  );

  const addProject = useCallback(
    (init: Partial<Omit<ProjectItem, "id">> = {}) =>
      dispatch({
        type: "listAdd",
        key: "projects",
        item: {
          id: makeId(),
          name: "",
          link: "",
          startDate: "",
          endDate: "",
          description: "",
          ...init,
        },
      }),
    [],
  );
  const updateProject = useCallback(
    (id: string, patch: Partial<ProjectItem>) =>
      dispatch({ type: "listUpdate", key: "projects", id, patch }),
    [],
  );
  const removeProject = useCallback(
    (id: string) => dispatch({ type: "listRemove", key: "projects", id }),
    [],
  );

  const addExperience = useCallback(
    (init: Partial<Omit<ExperienceItem, "id">> = {}) =>
      dispatch({
        type: "listAdd",
        key: "experience",
        item: {
          id: makeId(),
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
          ...init,
        },
      }),
    [],
  );
  const updateExperience = useCallback(
    (id: string, patch: Partial<ExperienceItem>) =>
      dispatch({ type: "listUpdate", key: "experience", id, patch }),
    [],
  );
  const removeExperience = useCallback(
    (id: string) => dispatch({ type: "listRemove", key: "experience", id }),
    [],
  );

  const addPortfolio = useCallback(
    (init: Partial<Omit<PortfolioItem, "id">> = {}) =>
      dispatch({
        type: "listAdd",
        key: "portfolio",
        item: { id: makeId(), image: "", caption: "", ...init },
      }),
    [],
  );
  const updatePortfolio = useCallback(
    (id: string, patch: Partial<PortfolioItem>) =>
      dispatch({ type: "listUpdate", key: "portfolio", id, patch }),
    [],
  );
  const removePortfolio = useCallback(
    (id: string) => dispatch({ type: "listRemove", key: "portfolio", id }),
    [],
  );

  const setSkills = useCallback(
    (skills: string[]) => dispatch({ type: "setSkills", skills }),
    [],
  );
  const updateSocials = useCallback(
    (patch: Partial<SocialLinks>) => dispatch({ type: "updateSocials", patch }),
    [],
  );
  const toggleSection = useCallback(
    (sectionId: string) => dispatch({ type: "toggleSection", sectionId }),
    [],
  );
  const setResume = useCallback(
    (d: ResumeData) => dispatch({ type: "setResume", data: d }),
    [],
  );

  const value = useMemo<ContextValue>(
    () => ({
      data,
      updateProfile,
      addEducation,
      updateEducation,
      removeEducation,
      addProject,
      updateProject,
      removeProject,
      addExperience,
      updateExperience,
      removeExperience,
      addPortfolio,
      updatePortfolio,
      removePortfolio,
      setSkills,
      updateSocials,
      toggleSection,
      setResume,
    }),
    [
      data,
      updateProfile,
      addEducation,
      updateEducation,
      removeEducation,
      addProject,
      updateProject,
      removeProject,
      addExperience,
      updateExperience,
      removeExperience,
      addPortfolio,
      updatePortfolio,
      removePortfolio,
      setSkills,
      updateSocials,
      toggleSection,
      setResume,
    ],
  );

  return (
    <ResumeDataContext.Provider value={value}>
      {children}
    </ResumeDataContext.Provider>
  );
}

export function useResumeData(): ContextValue {
  const ctx = useContext(ResumeDataContext);
  if (!ctx) {
    throw new Error("useResumeData must be used inside <ResumeDataProvider>");
  }
  return ctx;
}
