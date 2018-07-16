import ArgumentReader from './utils/argument_reader'
import Selector from './utils/selector'
import Spuses from './mappings/spuses'
import SpuScript from './spu_script'
import Checker from './checker'
import Blocks from './mappings/blocks'
import Effects from './mappings/effects'
import Enchantments from './mappings/enchantments'
import Entities from './mappings/entities'
import Items from './mappings/items'
import Particles from './mappings/particles'
import ScoreboardCriterias from './mappings/scoreboard_criterias'
import { isNumeric, getNbt, escape } from './utils/utils'
import { NbtString, NbtCompound, NbtShort, NbtList, NbtInt, NbtByte } from './utils/nbt/nbt'

/**
 * Provides methods to convert commands in a mcf file from minecraft 1.12 to 1.13.
 * @author SPGoding
 */
export default class Updater {
    /**
     * Returns an result map from an 1.12 command and an 1.12 spus.
     * @param cmd An 1.12 minecraft command.
     * @param spus An 1.12 spus defined in spuses.ts.
     * @returns NULLABLE. A map filled with converted value.
     * @example {'%n': 'converted value'}.
     */
    public static getResultMap(cmd: string, spus: string) {
        let spusReader = new ArgumentReader(spus)
        let spusArg = spusReader.next()
        let cmdSplited = cmd.split(' ')
        let begin: number = 0
        let end: number = cmdSplited.length
        let cmdArg = cmdSplited.slice(begin, end).join(' ')
        let map = new Map<string, string>()
        let cnt = 0
        while (spusArg !== '' && begin < cmdSplited.length) {
            while (!Checker.isArgumentMatch(cmdArg, spusArg)) {
                if (cmdArg !== '') {
                    end -= 1
                    cmdArg = cmdSplited.slice(begin, end).join(' ')
                } else {
                    // The cmdArg has sliced to ''.
                    // Still can't match.
                    return null
                }
            }

            begin = end
            end = cmdSplited.length

            if (spusArg.charAt(0) === '%') {
                map.set(`%${cnt++}`, Updater.upArgument(cmdArg, spusArg))
            }
            spusArg = spusReader.next()
            cmdArg = cmdSplited.slice(begin, end).join(' ')
        }
        if (cmdArg === '' && spusArg === '') {
            // Match successfully.
            return map
        } else {
            return null
        }
    }

    public static upLine(input: string, positionCorrect: boolean) {
        if (input.charAt(0) === '#' || /^\s*$/.test(input)) {
            return input
        } else {
            return Updater.upCommand(input, positionCorrect)
        }
    }

    public static upCommand(input: string, positionCorrect: boolean) {
        let slash = false

        if (input.slice(0, 1) === '/') {
            input = input.slice(1)
            slash = true
        }

        for (const spusOld of Spuses.pairs.keys()) {
            let map = Updater.getResultMap(input, spusOld)
            if (map) {
                let spusNew = Spuses.pairs.get(spusOld)
                if (spusNew) {
                    let spus = new SpuScript(spusNew)
                    let result = spus.compileWith(map)
                    if (positionCorrect) {
                        return `execute positioned 0.0 0.0 0.0 run ${result}`
                    } else {
                        if (slash) {
                            result = '/' + result
                        }
                        return result
                    }
                }
            }
        }
        throw `Unknown command: ${input}`
    }

    public static upArgument(arg: string, spus: string) {
        switch (spus.slice(1)) {
            case 'adv':
                return arg
            case 'adv_crit':
                return arg
            case 'block':
                return arg
            case 'block_dust_param':
                return Updater.upBlockDustParam(arg)
            case 'block_metadata_or_state':
                return arg
            case 'block_nbt':
                return arg
            case 'bool':
                return arg
            case 'command':
                return Updater.upCommand(arg, false)
            case 'difficulty':
                return Updater.upDifficulty(arg)
            case 'effect':
                return Updater.upEffect(arg)
            case 'entity':
                return Updater.upEntity(arg)
            case 'entity_nbt':
                return Updater.upEntityNbt(arg)
            case 'ench':
                return Updater.upEnch(arg)
            case 'entity_type':
                return Updater.upEntityType(arg)
            case 'func':
                return arg
            case 'gamemode':
                return Updater.upGamemode(arg)
            case 'ip':
                return arg
            case 'item':
                return arg
            case 'item_data':
                return arg
            case 'item_dust_params':
                return Updater.upItemDustParams(arg)
            case 'item_nbt':
                return Updater.upItemNbt(arg)
            case 'item_tag_nbt':
                return arg
            case 'json':
                return Updater.upJson(arg)
            case 'literal':
                return arg.toLowerCase()
            case 'num':
                return arg
            case 'num_or_star':
                return arg
            case 'particle':
                return Updater.upParticle(arg)
            case 'pre_json':
                return Updater.upPreJson(arg)
            case 'recipe':
                return arg
            case 'say_string':
                return Updater.upSayString(arg)
            case 'scb_crit':
                return Updater.upScbCrit(arg)
            case 'slot':
                return Updater.upSlot(arg)
            case 'sound':
                return arg
            case 'source':
                return arg
            case 'string':
                return arg
            case 'uuid':
                return arg
            case 'vec_2':
                return arg
            case 'vec_3':
                return arg
            case 'word':
                return arg
            default:
                throw `Unknown arg type: '${spus}'`
        }
    }

    public static upBlockDustParam(input: string) {
        const num = Number(input)
        const nominal = Blocks.to113(Blocks.std112(num)).getFull()
        return nominal
    }

    public static upDifficulty(input: string) {
        switch (input) {
            case '0':
            case 'p':
            case 'peaceful':
                return 'peaceful'
            case '1':
            case 'e':
            case 'easy':
                return 'easy'
            case '2':
            case 'n':
            case 'normal':
                return 'normal'
            case '3':
            case 'h':
            case 'hard':
                return 'hard'
            default:
                throw `Unknown difficulty: ${input}`
        }
    }

    public static upEffect(input: string) {
        if (isNumeric(input)) {
            return Effects.to113(Number(input))
        } else {
            return input
        }
    }

    public static upEnch(input: string) {
        if (isNumeric(input)) {
            return Enchantments.to113(Number(input))
        } else {
            return input
        }
    }

    public static upEntity(input: string) {
        let sel = new Selector()
        if (Checker.isSelector(input)) {
            sel.parse1_12(input)
        } else if (Checker.isWord(input)) {
            sel.parse1_12(`@p[name=${input}]`)
        } else {
            return input
        }
        return sel.to1_13()
    }

    public static upEntityNbt(input: string) {
        // https://minecraft.gamepedia.com/Chunk_format#Entity_format

        const root = getNbt(input)

        /* id */ {
            const id = root.get('id')
            if (id instanceof NbtString) {
                id.set(Entities.to113(id.get()))
            }
        }
        /* CustomName */ {
            const value = root.get('CustomName')
            if (value instanceof NbtString) {
                value.set(`{"text":"${escape(value.get())}"}`)
            }
        }
        /* Passengers */ {
            const passengers = root.get('Passengers')
            if (passengers instanceof NbtList) {
                for (let i = 0; i < passengers.length; i++) {
                    let passenger = passengers.get(i)
                    passenger = getNbt(Updater.upEntityNbt(passenger.toString()))
                    passengers.set(i, passenger)
                }
            }
        }
        /* HandItems */ {
            const handItems = root.get('HandItems')
            if (handItems instanceof NbtList) {
                for (let i = 0; i < handItems.length; i++) {
                    let item = handItems.get(i)
                    item = getNbt(Updater.upItemNbt(item.toString()))
                    handItems.set(i, item)
                }
            }
        }
        /* ArmorItems */ {
            const armorItems = root.get('ArmorItems')
            if (armorItems instanceof NbtList) {
                for (let i = 0; i < armorItems.length; i++) {
                    let item = armorItems.get(i)
                    item = getNbt(Updater.upItemNbt(item.toString()))
                    armorItems.set(i, item)
                }
            }
        }
        /* ArmorItem */ {
            let armorItem = root.get('ArmorItem')
            if (armorItem instanceof NbtCompound) {
                armorItem = getNbt(Updater.upItemNbt(armorItem.toString()))
                root.set('ArmorItem', armorItem)
            }
        }
        /* SaddleItem */ {
            let saddleItem = root.get('SaddleItem')
            if (saddleItem instanceof NbtCompound) {
                saddleItem = getNbt(Updater.upItemNbt(saddleItem.toString()))
                root.set('SaddleItem', saddleItem)
            }
        }
        /* Items */ {
            const items = root.get('Items')
            if (items instanceof NbtList) {
                for (let i = 0; i < items.length; i++) {
                    let item = items.get(i)
                    item = getNbt(Updater.upItemNbt(item.toString()))
                    items.set(i, item)
                }
            }
        }
        /* carried & carriedData */ {
            const carried = root.get('carried')
            const carriedData = root.get('carriedData')
            root.del('carried')
            root.del('carriedData')
            if (
                (carried instanceof NbtShort || carried instanceof NbtInt) &&
                (carriedData instanceof NbtShort || carriedData instanceof NbtInt || typeof carriedData === 'undefined')
            ) {
                const carriedBlockState = Updater.upBlockNumericIDToBlockState(carried, carriedData)
                root.set('carriedBlockState', carriedBlockState)
            }
        }
        /* DecorItem */ {
            let decorItem = root.get('DecorItem')
            if (decorItem instanceof NbtCompound) {
                decorItem = getNbt(Updater.upItemNbt(decorItem.toString()))
                root.set('DecorItem', decorItem)
            }
        }
        /* Inventory */ {
            const inventory = root.get('Inventory')
            if (inventory instanceof NbtList) {
                for (let i = 0; i < inventory.length; i++) {
                    let item = inventory.get(i)
                    item = getNbt(Updater.upItemNbt(item.toString()))
                    inventory.set(i, item)
                }
            }
        }
        /* inTile */ {
            const inTile = root.get('inTile')
            root.del('inTile')
            if (inTile instanceof NbtString) {
                const inBlockState = Blocks.upStringToBlockState(inTile)
                root.set('inBlockState', inBlockState)
            }
        }
        /* Item */ {
            let item = root.get('Item')
            if (item instanceof NbtCompound) {
                item = getNbt(Updater.upItemNbt(item.toString()))
                root.set('Item', item)
            }
        }
        /* SelectedItem */ {
            let selectedItem = root.get('SelectedItem')
            if (selectedItem instanceof NbtCompound) {
                selectedItem = getNbt(Updater.upItemNbt(selectedItem.toString()))
                root.set('SelectedItem', selectedItem)
            }
        }
        /* FireworksItem */ {
            let fireworksItem = root.get('FireworksItem')
            if (fireworksItem instanceof NbtCompound) {
                fireworksItem = getNbt(Updater.upItemNbt(fireworksItem.toString()))
                root.set('FireworksItem', fireworksItem)
            }
        }
        /* Command */ {
            const command = root.get('Command')
            if (command instanceof NbtString) {
                command.set(Updater.upCommand(command.get(), false))
            }
        }
        /* SpawnPotentials */ {
            const spawnPotentials = root.get('SpawnPotentials')
            if (spawnPotentials instanceof NbtList) {
                for (let i = 0; i < spawnPotentials.length; i++) {
                    const potential = spawnPotentials.get(i)
                    if (potential instanceof NbtCompound) {
                        let entity = potential.get('Entity')
                        if (entity instanceof NbtCompound) {
                            entity = getNbt(Updater.upEntityNbt(entity.toString()))
                            potential.set('Entity', entity)
                        }
                    }
                }
            }
        }
        /* SpawnData */ {
            let spawnData = root.get('SpawnData')
            if (spawnData instanceof NbtCompound) {
                spawnData = getNbt(Updater.upEntityNbt(spawnData.toString()))
                root.set('SpawnData', spawnData)
            }
        }
        /* Block & Data & TileEntityData */ {
            const block = root.get('Block')
            const data = root.get('Data')
            root.del('Block')
            root.del('Data')
            if (
                block instanceof NbtString &&
                (data instanceof NbtByte || data instanceof NbtInt || typeof data === 'undefined')
            ) {
                const blockState = Blocks.upStringToBlockState(block, data)
                root.set('BlockState', blockState)
            }

            let tileEntityData = root.get('TileEntityData')
            if (
                block instanceof NbtString &&
                tileEntityData instanceof NbtCompound &&
                (data instanceof NbtInt || data instanceof NbtByte || data === undefined)
            ) {
                tileEntityData = Blocks.to113(
                    Blocks.std112(undefined, block.get(), data ? data.get() : 0, undefined, tileEntityData.toString())
                ).getNbt()
                root.set('TileEntityData', tileEntityData)
            }
        }
        /* DisplayTile & DisplayData */ {
            const displayTile = root.get('DisplayTile')
            const displayData = root.get('DisplayData')
            root.del('DisplayTile')
            root.del('DisplayData')
            if (
                displayTile instanceof NbtString &&
                (displayData instanceof NbtInt || typeof displayData === 'undefined')
            ) {
                const displayState = Blocks.upStringToBlockState(displayTile, displayData)
                root.set('DisplayState', displayState)
            }
        }
        /* Particle & ParticleParam1 & ParticleParam2 */ {
            const particle = root.get('Particle')
            const particleParam1 = root.get('ParticleParam1')
            const particleParam2 = root.get('ParticleParam2')
            root.del('ParticleParam1')
            root.del('ParticleParam2')
            if (particle instanceof NbtString) {
                particle.set(Updater.upParticle(particle.get()))
                if (particle.get() === 'block') {
                    if (particleParam1 instanceof NbtInt) {
                        particle.set(particle.get() + ' ' + Updater.upBlockDustParam(particleParam1.get().toString()))
                    }
                } else if (particle.get() === 'item') {
                    if (particleParam1 instanceof NbtInt && particleParam2 instanceof NbtInt) {
                        particle.set(
                            particle.get() +
                                ' ' +
                                Updater.upItemDustParams(
                                    particleParam1.get().toString() + ' ' + particleParam2.get().toString()
                                )
                        )
                    }
                }
            }
        }

        return root.toString()
    }

    private static upBlockNumericIDToBlockState(id: NbtShort | NbtInt, data?: NbtShort | NbtInt) {
        const blockState = new NbtCompound()
        const name = new NbtString()
        const properties = new NbtCompound()
        const metadata = data ? data.get() : 0
        const std = Blocks.to113(Blocks.std112(id.get(), undefined, metadata))
        name.set(std.getName())
        if (std.hasStates()) {
            std.getStates().forEach(v => {
                const val = new NbtString()
                const pairs = v.split('=')
                val.set(pairs[1])
                properties.set(pairs[0], val)
            })
            blockState.set('Properties', properties)
        }
        blockState.set('Name', name)
        return blockState
    }

    public static upEntityType(input: string) {
        return Entities.to113(input)
    }

    public static upGamemode(input: string) {
        switch (input) {
            case '0':
            case 's':
            case 'survival':
                return 'survival'
            case '1':
            case 'c':
            case 'creative':
                return 'creative'
            case '2':
            case 'a':
            case 'adventure':
                return 'adventure'
            case '3':
            case 'sp':
            case 'spectator':
                return 'spectator'
            default:
                throw `Unknown gamemode: ${input}`
        }
    }

    public static upItemDustParams(input: string) {
        const params = input.split(' ').map(x => Number(x))
        return Items.to113(Items.std112(params[0], undefined, params[1])).getNominal()
    }

    public static upItemNbt(input: string) {
        const root = getNbt(input)
        const id = root.get('id')
        const damage = root.get('Damage')
        let tag = root.get('tag')
        root.del('Damage')

        if (
            id instanceof NbtString &&
            (damage === undefined || damage instanceof NbtShort || damage instanceof NbtInt)
        ) {
            if (tag instanceof NbtCompound) {
                tag = getNbt(Updater.upItemTagNbt(tag.toString(), id.get()))
            }
            if (Items.isDamagableItem(id.get())) {
                if (!(tag instanceof NbtCompound)) {
                    tag = new NbtCompound()
                }
                if (damage !== undefined) {
                    tag.set('Damage', damage)
                }
            } else {
                const newID = Items.to113(Items.std112(undefined, id.get(), damage ? damage.get() : 0)).getName()
                id.set(newID)
                root.set('id', id)
            }
            if (tag instanceof NbtCompound) {
                root.set('tag', tag)
            }
        }

        return root.toString()
    }

    public static upItemTagNbt(nbt: string, itemNominalID: string) {
        // https://minecraft.gamepedia.com/Player.dat_format#Item_structure
        const item = itemNominalID.split('[')[0]
        const root = getNbt(nbt)
        /* CanDestroy */ {
            const canDestroy = root.get('CanDestroy')
            if (canDestroy instanceof NbtList) {
                for (let i = 0; i < canDestroy.length; i++) {
                    const block = canDestroy.get(i)
                    if (block instanceof NbtString) {
                        block.set(Blocks.to113(Blocks.std112(undefined, block.get(), 0)).getName())
                        canDestroy.set(i, block)
                    }
                }
                root.set('CanDestroy', canDestroy)
            }
        }
        /* CanPlaceOn */ {
            const canPlaceOn = root.get('CanPlaceOn')
            if (canPlaceOn instanceof NbtList) {
                for (let i = 0; i < canPlaceOn.length; i++) {
                    const block = canPlaceOn.get(i)
                    if (block instanceof NbtString) {
                        block.set(Blocks.to113(Blocks.std112(undefined, block.get(), 0)).getName())
                    }
                    canPlaceOn.set(i, block)
                }
                root.set('CanPlaceOn', canPlaceOn)
            }
        }
        /* BlockEntityTag */ {
            let blockEntityTag = root.get('BlockEntityTag')
            if (blockEntityTag instanceof NbtCompound) {
                blockEntityTag = Blocks.to113(
                    Blocks.std112(undefined, item, undefined, undefined, blockEntityTag.toString())
                ).getNbt()
                root.set('BlockEntityTag', blockEntityTag)
            }
        }
        /* ench */ {
            const enchantments = root.get('ench')
            root.del('ench')
            if (enchantments instanceof NbtList) {
                for (let i = 0; i < enchantments.length; i++) {
                    const enchantment = enchantments.get(i)
                    if (enchantment instanceof NbtCompound) {
                        let id = enchantment.get('id')
                        if (id instanceof NbtShort || id instanceof NbtInt) {
                            const strID = Enchantments.to113(id.get())
                            id = new NbtString()
                            id.set(strID)
                            enchantment.set('id', id)
                        }
                        enchantments.set(i, enchantment)
                    }
                }
                root.set('Enchantments', enchantments)
            }
        }
        /* StoredEnchantments */ {
            const storedEnchantments = root.get('StoredEnchantments')
            if (storedEnchantments instanceof NbtList) {
                for (let i = 0; i < storedEnchantments.length; i++) {
                    const enchantment = storedEnchantments.get(i)
                    if (enchantment instanceof NbtCompound) {
                        let id = enchantment.get('id')
                        if (id instanceof NbtShort || id instanceof NbtInt) {
                            const strID = Enchantments.to113(id.get())
                            id = new NbtString()
                            id.set(strID)
                            enchantment.set('id', id)
                        }
                        storedEnchantments.set(i, enchantment)
                    }
                }
                root.set('Enchantments', storedEnchantments)
            }
        }
        /* display.(Name|LocName) */ {
            const display = root.get('display')
            if (display instanceof NbtCompound) {
                const name = display.get('Name')
                if (name instanceof NbtString) {
                    name.set(`{"text": "${escape(name.get())}"}`)
                    display.set('Name', name)
                }
                const locName = display.get('LocName')
                display.del('LocName')
                if (locName instanceof NbtString) {
                    locName.set(`{"translate": "${locName.get()}"}`)
                    display.set('Name', locName)
                }
                root.set('display', display)
            }
        }
        /* EntityTag */ {
            if (Items.hasEntityTag(item)) {
                let entityTag = root.get('EntityTag')
                if (entityTag instanceof NbtCompound) {
                    entityTag = getNbt(Updater.upEntityNbt(entityTag.toString()))
                    root.set('EntityTag', entityTag)
                }
            }
        }

        return root.toString()
    }

    public static upJson(input: string) {
        if (input.slice(0, 1) === '"') {
            return input
        } else if (input.slice(0, 1) === '[') {
            let json = JSON.parse(input)
            let result: string[] = []
            for (const i of json) {
                result.push(Updater.upJson(JSON.stringify(i)))
            }
            return `[${result.join()}]`
        } else {
            let json = JSON.parse(input)
            if (json.selector) {
                let sel = new Selector()
                sel.parse1_12(json.selector)
                json.selector = sel.to1_13()
            }

            if (
                json.clickEvent &&
                json.clickEvent.action &&
                (json.clickEvent.action === 'run_command' || json.clickEvent.action === 'suggest_command') &&
                json.clickEvent.value
            ) {
                json.clickEvent.value = Updater.upCommand(json.clickEvent.value, false)
            }

            if (json.extra) {
                json.extra = JSON.parse(Updater.upJson(JSON.stringify(json.extra)))
            }

            return JSON.stringify(json)
        }
    }

    public static upParticle(input: string) {
        return Particles.to113(input)
    }

    public static upPreJson(input: string) {
        return `{"text":"${escape(input)}"}`
    }

    public static upSayString(input: string) {
        let arr = input.split(' ')
        let ans: string[] = []
        for (const i of arr) {
            if (Checker.isSelector(i)) {
                ans.push(Updater.upEntity(i))
            } else {
                ans.push(i)
            }
        }
        return ans.join(' ')
    }

    public static upScbCrit(input: string) {
        if (input.slice(0, 5) === 'stat.') {
            const subs = input.split(/\./g)
            const newCrit = ScoreboardCriterias.to113(subs[1])
            switch (subs[1]) {
                case 'mineBlock':
                    let block = ''
                    if (isNumeric(subs[2])) {
                        block = Blocks.to113(Blocks.std112(Number(subs[2])))
                            .getName()
                            .replace(/:/g, '.')
                            .replace(/\[.*$/g, '')
                    } else {
                        block = Blocks.to113(Blocks.std112(undefined, `${subs[2]}:${subs[3]}`))
                            .getName()
                            .replace(/:/g, '.')
                            .replace(/\[.*$/g, '')
                    }
                    return `minecraft.${newCrit}:${block}`
                case 'craftItem':
                case 'useItem':
                case 'breakItem':
                case 'pickup':
                case 'drop':
                    let item = ''
                    if (isNumeric(subs[2])) {
                        item = Items.to113(Items.std112(Number(subs[2])))
                            .getName()
                            .replace(/:/g, '.')
                            .replace(/\[.*$/g, '')
                    } else {
                        item = Items.to113(Items.std112(undefined, subs[2], Number(subs[3])))
                            .getName()
                            .replace(/:/g, '.')
                            .replace(/\[.*$/g, '')
                    }
                    return `minecraft.${newCrit}:${item}`
                case 'killEntity':
                case 'entityKilledBy':
                    const entity = Entities.to113(Entities.to112(subs[2])).replace(/:/g, '.')
                    return `minecraft.${newCrit}:${entity}`
                default:
                    return `minecraft.custom:minecraft.${subs[1]}`
            }
        } else {
            return input
        }
    }

    public static upSlot(input: string) {
        return input.slice(5)
    }
}
