import axios from 'axios';

export const getUserInfo = async ( steamid ) => {
    try {
        const inventory = await getInventory(440, steamid, 2);

        let tours = {
            two_cities: 0,
            gear_grinder: 0,
            mecha_engine: 0,
            steel_trap: 0,
            oil_spill: 0
        };

        for (const item of inventory.items) {
            switch (item.name) {
                case 'Operation Two Cities Badge':
                    tours.two_cities = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Gear Grinder Badge':
                    tours.gear_grinder = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Mecha Engine Badge':
                    tours.mecha_engine = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Steel Trap Badge':
                    tours.steel_trap = parseInt(item.type.substr(6).slice(0, -6));
                    break;
                case 'Operation Oil Spill Badge':
                    tours.oil_spill = parseInt(item.type.substr(6).slice(0, -6));
                    break;
            }
        }
        return tours;
    } catch (e) {
        return null;
    }
}

export const getInventory = async (app_id, steam_id, context_id, options?) => {
    if (!options) {
        options = {};
    }

    if (typeof app_id !== 'number') {
        throw "app_id must be a number";
    }
    if (typeof steam_id !== 'string') {
        throw "steam_id must be a string";
    }
    if (!context_id) {
        throw "context_id must be provided";
    }
    if (typeof context_id === 'string') {
        context_id = parseInt(context_id);
    }

    let count_text = '?count=1000';
    if (options.count) {
        if (typeof options.count !== 'number') {
            throw new Error("count must be a number");
        }
        if (options.count > 2000) {
            throw new Error("count cannot be larger than 2000");
        }
        count_text = `?count=${options.count}`;
    }

    const request_url = `https://steamcommunity.com/inventory/${steam_id}/${app_id}/${context_id}${count_text}`
    return await getItemLoop(request_url);
}

const getItemLoop = async (request, last_item?) => {
    try {
        const req = await axios({ method: 'get', url: `${request}&start_assetid=${last_item}` });

        let items = req.data.descriptions;
        let assets = req.data.assets;
        let new_data;

        if (req.data.more_items) {
            let loop_data = await getItemLoop(request, req.data.last_assetid);

            new_data = {
                // @ts-ignore
                items: items.concat(loop_data.items),
                // @ts-ignore
                assets: assets.concat(loop_data.assets),
            };

            return new_data
        }
        new_data = {
            items: items,
            assets: assets
        };
        return new_data;
    } catch (e) {
        return null;
    }
}
