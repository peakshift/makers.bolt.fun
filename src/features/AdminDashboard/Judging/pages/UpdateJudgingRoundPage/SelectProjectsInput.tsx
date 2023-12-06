import React from "react";
import { Link } from "react-router-dom";
import { Project } from "src/graphql";
import { createRoute } from "src/utils/routing";

interface Props {
  projects: Pick<Project, "id" | "title" | "hashtag" | "thumbnail_image">[];
  value: number[];
  onChange: (value: number[]) => void;
}

export default function SelectProjectsInput({
  projects,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <ul className="flex flex-col gap-8">
        <li className="flex gap-16 items-center mb-8">
          <input
            id="select-all-projects"
            type="checkbox"
            checked={value.length === projects.length}
            onChange={(e) => {
              if (e.target.checked) {
                onChange(projects.map((project) => project.id));
              } else {
                onChange([]);
              }
            }}
          />
          <label htmlFor="select-all-projects" className="text-gray-500">
            {value.length === projects.length ? "Unselect all" : "Select all"}
          </label>
        </li>
        {projects.map((project) => (
          <li key={project.id} className="flex gap-8 items-center">
            <input
              type="checkbox"
              checked={value.includes(project.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...value, project.id]);
                } else {
                  onChange(value.filter((id) => id !== project.id));
                }
              }}
            />
            <div className="flex items-center gap-12">
              <img
                className="w-48 aspect-square rounded-12 border border-gray-100"
                alt=""
                src={project.thumbnail_image!}
              />
              <div className="overflow-hidden">
                <Link
                  to={createRoute({ type: "project", tag: project.hashtag })}
                  target="_blank"
                >
                  <p className="text-body4 text-gray-800 font-bold underline whitespace-nowrap overflow-hidden text-ellipsis">
                    {project.title}
                  </p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
