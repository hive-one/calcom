import { cx } from "class-variance-authority";
import React from "react";

function ExperienceItem({ experience, className }) {
  // If there are multiple roles, show them in a list with dots
  // If there is only one role, show it as a single line with no dots and indentation
  const formatDate = (date) => date?.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });

  return (
    <div className={cx("flex w-full flex-col ", className)}>
      <div className="self-start whitespace-nowrap  font-semibold">{experience?.company?.name}</div>
      <div className="flex flex-row items-stretch">
        <div className="mt-2 flex w-7 shrink-0 flex-col items-center justify-start gap-1">
          <div className="h-2 w-2 rounded-full bg-gray-300" />
        </div>
        <div className="flex flex-col">
          <div>{experience.title}</div>
          <div className="text-gray-400">
            {formatDate(experience.startDay) +
              "-" +
              formatDate(experience.startMonth) +
              "-" +
              formatDate(experience.startYear)}{" "}
            –{" "}
            {experience.isCurrentRole
              ? "Present"
              : formatDate(experience.endDay) +
                "-" +
                formatDate(experience.endMonth) +
                "-" +
                formatDate(experience.endYear)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceItem;
