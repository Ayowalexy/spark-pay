import { ReactNode } from "react";


export type accountPages = {
    name: string,
    icon: ReactNode,
    screen: 'Transactions' | 'Institutions' | 'Disputes' | 'Settlements',
    color: string,
}

export type transgateMenuTypes = {
    id: number;
    role_id: number;
    label: "Transactions";
}