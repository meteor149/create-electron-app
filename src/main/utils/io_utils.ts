import fs from "fs";
import {mLogger} from "./log_utils";

export function createDir (dir: string) {
    fs.mkdirSync(dir, { recursive: true });
}

export function createFileSync (path: string, flags: string = 'w') {
    fs.openSync(path, flags);
}

export function copyFile (src: string, dist: string) {
    fs.writeFileSync(dist, fs.readFileSync(src));
}

export function saveFile (fileDir: string, content: string) {
    return fs.writeFile(fileDir, content, (err) => {
        if (err) {
            mLogger.error(err);
            throw err;
        }
        return true;
    });
}

export function deleteAll (dir: string) {
    let files = [];
    if( fs.existsSync(dir) ) {
        files = fs.readdirSync(dir);
        files.forEach(
            function (file, index) {
                var curPath = dir + '/' + file;
                if(fs.statSync(curPath).isDirectory()) {
                    deleteAll(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
        fs.rmdirSync(dir);
    }
}
