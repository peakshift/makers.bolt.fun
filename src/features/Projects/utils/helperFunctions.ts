import { Team_Member_Role } from "src/graphql";

export function sortMembersByRole<T extends { role: Team_Member_Role }>(members: T[]) {
    return [...members].sort((a, b) => {
        if (a.role === b.role) return 0
        if (a.role === Team_Member_Role.Owner) return -1;
        if (b.role === Team_Member_Role.Owner) return +1;
        if (a.role === Team_Member_Role.Admin) return -1;
        return +1;
    })
}