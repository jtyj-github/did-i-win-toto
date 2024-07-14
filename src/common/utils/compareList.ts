import { isEqual } from 'lodash';

export default function getKeyDifference<T extends Record<string, any>>(
    new_list: T,
    old_list: T | Record<string, unknown>,
): string[] {
    const diff_list: string[] = [];
    console.log('---------------Comparing Lists---------------');

    if(Object.keys(old_list).length === 0) {
        console.log('Previous list does not exist, starting new list');
        for (const key in new_list) {
            diff_list.push(key);
    }
    return diff_list;
}
for (const key in new_list) {
    if (!isEqual(new_list[key], old_list[key])) {
        console.log(`${key} has changed`);
        diff_list.push(key);
    } else {
        console.log(`${key} has not changed`);
    }
}
return diff_list;
}