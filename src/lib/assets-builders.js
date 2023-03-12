import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";
export class ModelManager {
    modid;
    map = new Map();
    static create(modid) {
        return new ModelManager(modid);
    }
    constructor(modid) {
        this.modid = modid;
    }
    createTagPath(pathTo) {
        let split = pathTo.includes('/') ? '/' : '\\';
        let tempPath = pathTo.split(split);
        tempPath.pop();
        let p = tempPath.join(split);
        if (!existsSync(p)) {
            mkdirSync(p, { recursive: true });
        }
        return pathTo;
    }
    joinString(...s) {
        return s.join('');
    }
    save(savePath, obj) {
        this.map.set(savePath, obj);
    }
    particleModel(p, itemName, parent = 'item/generated') {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(p, '.json')));
        let obj = {
            parent: parent,
            textures: {
                particle: `${this.modid}:item/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }
    itemModelWithParent(p, itemName, parent = 'item/generated') {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(p, '.json')));
        let obj = {
            parent: parent,
            textures: {
                layer0: `${this.modid}:item/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }
    itemModel(itemName, parent = 'item/generated') {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemName, '.json')));
        let obj = {
            parent: parent,
            textures: {
                layer0: `${this.modid}:item/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }
    itemBlockModel(itemName) {
        let savePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemName, '.json')));
        let obj = {
            parent: 'item/generated',
            textures: {
                layer0: `${this.modid}:block/${itemName}`
            }
        };
        this.map.set(savePath, obj);
    }
    decorativeBlocks(blockName) {
        this.block(blockName);
        this.stairs(blockName, blockName);
        this.slab(blockName + '_slab', blockName);
        this.wall(blockName + '_wall', blockName);
    }
    stairs(blockName, otherBlockName) {
        let stairs = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_stairs.json')));
        let innerStairs = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_stairs_inner.json')));
        let outerStairs = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_stairs_outer.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '_stairs.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '_stairs.json')));
        this.save(fullBlockstatePath, {
            "variants": {
                "facing=east,half=bottom,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`
                },
                "facing=west,half=bottom,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`,
                    "y": 180,
                    "uvlock": true
                },
                "facing=south,half=bottom,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`,
                    "y": 90,
                    "uvlock": true
                },
                "facing=north,half=bottom,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`,
                    "y": 270,
                    "uvlock": true
                },
                "facing=east,half=bottom,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`
                },
                "facing=west,half=bottom,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "y": 180,
                    "uvlock": true
                },
                "facing=south,half=bottom,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "y": 90,
                    "uvlock": true
                },
                "facing=north,half=bottom,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "y": 270,
                    "uvlock": true
                },
                "facing=east,half=bottom,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "y": 270,
                    "uvlock": true
                },
                "facing=west,half=bottom,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "y": 90,
                    "uvlock": true
                },
                "facing=south,half=bottom,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`
                },
                "facing=north,half=bottom,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "y": 180,
                    "uvlock": true
                },
                "facing=east,half=bottom,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`
                },
                "facing=west,half=bottom,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "y": 180,
                    "uvlock": true
                },
                "facing=south,half=bottom,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "y": 90,
                    "uvlock": true
                },
                "facing=north,half=bottom,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "y": 270,
                    "uvlock": true
                },
                "facing=east,half=bottom,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "y": 270,
                    "uvlock": true
                },
                "facing=west,half=bottom,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "y": 90,
                    "uvlock": true
                },
                "facing=south,half=bottom,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`
                },
                "facing=north,half=bottom,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "y": 180,
                    "uvlock": true
                },
                "facing=east,half=top,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`,
                    "x": 180,
                    "uvlock": true
                },
                "facing=west,half=top,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`,
                    "x": 180,
                    "y": 180,
                    "uvlock": true
                },
                "facing=south,half=top,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`,
                    "x": 180,
                    "y": 90,
                    "uvlock": true
                },
                "facing=north,half=top,shape=straight": {
                    "model": `${this.modid}:block/${blockName}_stairs`,
                    "x": 180,
                    "y": 270,
                    "uvlock": true
                },
                "facing=east,half=top,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "y": 90,
                    "uvlock": true
                },
                "facing=west,half=top,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "y": 270,
                    "uvlock": true
                },
                "facing=south,half=top,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "y": 180,
                    "uvlock": true
                },
                "facing=north,half=top,shape=outer_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "uvlock": true
                },
                "facing=east,half=top,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "uvlock": true
                },
                "facing=west,half=top,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "y": 180,
                    "uvlock": true
                },
                "facing=south,half=top,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "y": 90,
                    "uvlock": true
                },
                "facing=north,half=top,shape=outer_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_outer`,
                    "x": 180,
                    "y": 270,
                    "uvlock": true
                },
                "facing=east,half=top,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "y": 90,
                    "uvlock": true
                },
                "facing=west,half=top,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "y": 270,
                    "uvlock": true
                },
                "facing=south,half=top,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "y": 180,
                    "uvlock": true
                },
                "facing=north,half=top,shape=inner_right": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "uvlock": true
                },
                "facing=east,half=top,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "uvlock": true
                },
                "facing=west,half=top,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "y": 180,
                    "uvlock": true
                },
                "facing=south,half=top,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "y": 90,
                    "uvlock": true
                },
                "facing=north,half=top,shape=inner_left": {
                    "model": `${this.modid}:block/${blockName}_stairs_inner`,
                    "x": 180,
                    "y": 270,
                    "uvlock": true
                }
            }
        });
        this.save(stairs, {
            "parent": "block/stairs",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(innerStairs, {
            "parent": "block/inner_stairs",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(outerStairs, {
            "parent": "block/outer_stairs",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(fullItemBlockPath, {
            parent: `${this.modid}:block/${blockName}_stairs`
        });
    }
    slab(blockName, otherBlockName) {
        let topSlab = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_top.json')));
        let slab = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        this.save(fullBlockstatePath, {
            "variants": {
                "type=bottom": {
                    "model": `${this.modid}:block/${blockName}`
                },
                "type=top": {
                    "model": `${this.modid}:block/${blockName}_top`
                },
                "type=double": {
                    "model": `${this.modid}:block/${otherBlockName}`
                }
            }
        });
        this.save(slab, {
            "parent": "block/slab",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(topSlab, {
            "parent": "block/slab_top",
            "textures": {
                "bottom": `${this.modid}:block/${otherBlockName}`,
                "top": `${this.modid}:block/${otherBlockName}`,
                "side": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(fullItemBlockPath, {
            parent: `${this.modid}:block/${blockName}`
        });
    }
    wall(blockName, otherBlockName) {
        let inventory = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_inventory.json')));
        let post = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_post.json')));
        let side = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_side.json')));
        let sideTall = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_side_tall.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        this.save(fullBlockstatePath, {
            "multipart": [
                {
                    "when": {
                        "up": "true"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_post`
                    }
                },
                {
                    "when": {
                        "north": "low"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_post`,
                        "uvlock": true
                    }
                },
                {
                    "when": {
                        "east": "low"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_post`,
                        "y": 90,
                        "uvlock": true
                    }
                },
                {
                    "when": {
                        "south": "low"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_post`,
                        "y": 180,
                        "uvlock": true
                    }
                },
                {
                    "when": {
                        "west": "low"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_post`,
                        "y": 270,
                        "uvlock": true
                    }
                },
                {
                    "when": {
                        "north": "tall"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_side_tall`,
                        "uvlock": true
                    }
                },
                {
                    "when": {
                        "east": "tall"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_side_tall`,
                        "y": 90,
                        "uvlock": true
                    }
                },
                {
                    "when": {
                        "south": "tall"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_side_tall`,
                        "y": 180,
                        "uvlock": true
                    }
                },
                {
                    "when": {
                        "west": "tall"
                    },
                    "apply": {
                        "model": `${this.modid}:block/${blockName}_side_tall`,
                        "y": 270,
                        "uvlock": true
                    }
                }
            ]
        });
        this.save(inventory, {
            "parent": "block/wall_inventory",
            "textures": {
                "wall": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(post, {
            "parent": "block/template_wall_post",
            "textures": {
                "wall": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(side, {
            "parent": "block/template_wall_side",
            "textures": {
                "wall": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(sideTall, {
            "parent": "block/template_wall_side_tall",
            "textures": {
                "wall": `${this.modid}:block/${otherBlockName}`
            }
        });
        this.save(fullItemBlockPath, {
            parent: `${this.modid}:block/${blockName}_inventory`
        });
    }
    bucket(itemPath, fluidPath) {
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(itemPath, '.json')));
        this.save(itemPath, {
            "parent": "forge:item/bucket_drip",
            "loader": "forge:bucket",
            "fluid": `${this.modid}:${fluidPath}`
        });
    }
    ladder(blockName) {
        let fullBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        this.save(fullBlockstatePath, {
            "variants": {
                "facing=east": {
                    "model": `${this.modid}:block/${blockName}`,
                    "y": 90
                },
                "facing=north": {
                    "model": `${this.modid}:block/${blockName}`
                },
                "facing=south": {
                    "model": `${this.modid}:block/${blockName}`,
                    "y": 180
                },
                "facing=west": {
                    "model": `${this.modid}:block/${blockName}`,
                    "y": 270
                }
            }
        });
        this.save(fullBlockPath, {
            "ambientocclusion": false,
            "textures": {
                "particle": `${this.modid}:block/${blockName}`,
                "texture": `${this.modid}:block/${blockName}`
            },
            "elements": [{
                    "from": [0, 0, 15.2],
                    "to": [16, 16, 15.2],
                    "shade": false,
                    "faces": {
                        "north": { "uv": [0, 0, 16, 16], "texture": "#texture" },
                        "south": { "uv": [16, 0, 0, 16], "texture": "#texture" }
                    }
                }]
        });
        this.itemBlockModel(blockName);
    }
    block(blockName) {
        let fullBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        //console.log(fullBlockPath, fullItemBlockPath, fullBlockstatePath);
        this.save(fullBlockstatePath, {
            "variants": {
                "": {
                    "model": `${this.modid}:block/${blockName}`
                }
            }
        });
        this.save(fullBlockPath, {
            "parent": "block/cube_all",
            "textures": {
                "all": `${this.modid}:block/${blockName}`
            }
        });
        this.save(fullItemBlockPath, {
            parent: `${this.modid}:block/${blockName}`
        });
    }
    horizontalBlock(blockName, side, top) {
        let normal = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '.json')));
        let horizontal = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'block', this.joinString(blockName, '_horizontal.json')));
        let fullItemBlockPath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'models', 'item', this.joinString(blockName, '.json')));
        let fullBlockstatePath = this.createTagPath(join('.', 'generated', this.modid, 'assets', this.modid, 'blockstates', this.joinString(blockName, '.json')));
        this.save(fullBlockstatePath, {
            "variants": {
                "axis=x": {
                    "model": `${this.modid}:block/${blockName}_horizontal`,
                    "x": 90,
                    "y": 90
                },
                "axis=y": {
                    "model": `${this.modid}:block/${blockName}`
                },
                "axis=z": {
                    "model": `${this.modid}:block/${blockName}_horizontal`,
                    "x": 90
                }
            }
        });
        this.save(normal, {
            "parent": "minecraft:block/cube_column",
            "textures": {
                "side": side,
                "end": top
            }
        });
        this.save(horizontal, {
            "parent": "minecraft:block/cube_column_horizontal",
            "textures": {
                "side": side,
                "end": top
            }
        });
        this.save(fullItemBlockPath, {
            parent: `${this.modid}:block/${blockName}`
        });
    }
    build() {
        this.map.forEach((value, key) => {
            writeFileSync(key, JSON.stringify(value, null, 2), 'utf8');
        });
    }
}
