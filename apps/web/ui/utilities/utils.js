import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cleanLink = (link) => {
  let cleanLink = link;

  if (cleanLink?.endsWith("/")) {
    cleanLink = cleanLink.slice(0, -1);
  }

  if (cleanLink?.includes("www.")) {
    cleanLink = cleanLink.replace("www.", "");
  }

  return cleanLink?.replace(/^https?\:\/\//i, "") ? cleanLink?.replace(/^https?\:\/\//i, "") : cleanLink;
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const isValidLinkedInUrl = (url) => {
  const pattern = /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
  return pattern.test(url);
};

export const extractUserNameFromLinkedinUrl = (url) => {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;
  const trimmedPathname = pathname.replace(/^\/+|\/+$/g, "");
  const pathParts = trimmedPathname.split("/");
  if (pathParts.length >= 2 && pathParts[0] === "in") {
    return pathParts[1];
  }
  return null;
};

const groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const linkedinExperienceTransformer = (roles) => {
  let experience = [],
    workExperiences = [];
  const groupedRoles = roles?.length ? groupBy(roles, "org_id") : [];

  Object.entries(groupedRoles).forEach(([id, entry]) => {
    const key = entry[0];
    experience.push({
      name: key?.org_name ?? "",
      url: key?.org_url ?? "",
      description: "",
      roles: [
        {
          description: key?.role_description ?? "",
          startMonth: parseInt(key?.role_start_date?.split("-")[1]),
          startYear: parseInt(key?.role_start_date?.split("-")[0]),
          startDay: 1,
          endDay: key?.role_end_date ? 1 : null,
          endMonth: key.role_end_date ? parseInt(key.role_end_date.split("-")[1]) : null,
          endYear: key.role_end_date ? parseInt(key.role_end_date.split("-")[0]) : null,
          title: key?.role_job_title ?? "",
          isCurrentRole: key.role_end_date ? false : true,
        },
      ],
    });

    workExperiences.push({
      title: key?.role_job_title ?? "",
      description: key?.role_description ?? "",
      startMonth: parseInt(key?.role_start_date?.split("-")[1]),
      startYear: parseInt(key?.role_start_date?.split("-")[0]),
      startDay: 1,
      endDay: key?.role_end_date ? 1 : null,
      endMonth: key?.role_end_date ? parseInt(key.role_end_date.split("-")[1]) : null,
      endYear: key?.role_end_date ? parseInt(key.role_end_date.split("-")[0]) : null,
      isCurrentRole: key.role_end_date ? false : true,
      company: {
        name: key?.org_name ?? "",
        linkedInId: key?.id ?? "",
        url: key?.org_url ?? "",
      },
    });
  });

  return { experience, workExperiences };
};

export const linkedinProjectsTransformer = (projects) => {
  const transformedData = [];

  for (const project of projects) {
    const formattedProject = {
      description: project?.description ?? "",
      title: project?.name ?? "",
      url: project?.url ?? "",
    };
    // if (!formattedProject.title) return;
    transformedData.push(formattedProject);
  }
  return transformedData || [];
};

export const linkedinPublicationsTransformer = (publications) => {
  const transformedData = [];
  for (const publication of publications) {
    const formattedPublication = {
      description: publication.description ?? "",
      title: publication.name ?? "",
      url: publication.url ?? "",
    };
    if (!formattedPublication.title) return;
    transformedData.push(formattedPublication);
  }
  return transformedData;
};

export const imageUrltoDataUrl = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = img.naturalHeight;
      canvas.width = img.naturalWidth;
      ctx.drawImage(img, 0, 0);
      const uri = canvas.toDataURL("image/png");
      resolve(uri);
    };
    img.onerror = reject;
    img.src = url;
  });
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
