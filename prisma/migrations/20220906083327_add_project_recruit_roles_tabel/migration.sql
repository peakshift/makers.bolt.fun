-- CreateTable
CREATE TABLE "ProjectRecruitRoles" (
    "projectId" INTEGER NOT NULL,
    "roleId" INTEGER NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "ProjectRecruitRoles_pkey" PRIMARY KEY ("projectId","roleId")
);

-- AddForeignKey
ALTER TABLE "ProjectRecruitRoles" ADD CONSTRAINT "ProjectRecruitRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "WorkRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectRecruitRoles" ADD CONSTRAINT "ProjectRecruitRoles_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
