import { MojoApp } from "@mojojs/core";
declare function initDev(app: MojoApp, args: string[]): Promise<void>;
declare namespace initDev {
    var description: string;
    var usage: string;
}
export default initDev;
