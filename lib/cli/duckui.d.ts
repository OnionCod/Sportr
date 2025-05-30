import { MojoApp } from "@mojojs/core";
declare function duckui(app: MojoApp): Promise<void>;
declare namespace duckui {
    var description: string;
    var usage: string;
}
export default duckui;
