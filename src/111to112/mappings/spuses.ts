/**
 * Providing a map storing old spus and new spus.
 */
export default class Spuses {
    /**
     * =====TYPES=====
     * %block_nbt
     * %bool
     * %command
     * %entity
     * %entity_nbt
     * %entity_type
     * %item_nbt
     * %item_tag_nbt
     * %json
     * %literal
     * %num
     * %num_or_star
     * %say_string
     * %string
     * %vec_2
     * %vec_3
     * %word
     */
    static pairs = new Map([
        ['achievement %string', '# achievement %0 !> Achievements have been removed in favor of advancements.'],
        ['ban %word', 'ban %0'],
        ['ban %word %string', 'ban %0 %1'],
        ['ban-ip %word', 'ban-ip %0'],
        ['ban-ip %word %string', 'ban-ip %0 %1'],
        ['ban-ip %word', 'ban-ip %0'],
        ['ban-ip %word %string', 'ban-ip %0 %1'],
        ['banlist %literal', 'banlist %0'],
        ['blockdata %vec_3 %block_nbt', 'blockdata %0 %1'],
        ['clear', 'clear'],
        ['clear %entity', 'clear %0'],
        ['clear %entity %word', 'clear %0 %1$fuckItemItself'],
        ['clear %entity %word %num', 'clear %0 %1$addDataToItem%2'],
        ['clear %entity %word %num %num', 'clear %0 %1$addDataToItem%2 %3'],
        ['clear %entity %word %num %num %entity_nbt', 'clear %0 %1$addDataAndNbtToItem%2%4'],
        ['clone %vec_3 %vec_3 %vec_3', 'clone %0 %1 %2'],
        ['clone %vec_3 %vec_3 %vec_3 %literal', 'clone %0 %1 %2 %3'],
        ['clone %vec_3 %vec_3 %vec_3 %literal %literal', 'clone %0 %1 %2 %3 %4'],
        ['clone %vec_3 %vec_3 %vec_3 %literal %literal %word', 'clone %0 %1 %2 %3 %5$fuckBlockItself %4'],
        [
            'clone %vec_3 %vec_3 %vec_3 %literal %literal %word %word',
            'clone %0 %1 %2 %3 %5$addDataOrStateToBlock%6 %4'
        ],
        ['debug %literal', 'debug %0'],
        ['defaultgamemode %word', 'defaultgamemode %0'],
        ['deop %word', 'deop %0'],
        ['difficulty %word', 'difficulty %0'],
        ['effect %entity clear', 'effect clear %0'],
        ['effect %entity %word', 'effect give %0 %1'],
        ['effect %entity %word %num', 'effect give %0 %1 %2'],
        ['effect %entity %word %num %num', 'effect give %0 %1 %2 %3'],
        ['effect %entity %word %num %num %bool', 'effect give %0 %1 %2 %3 %4'],
        ['enchant %entity %word', 'enchant %0 %1'],
        ['enchant %entity %word %num', 'enchant %0 %1 %2'],
        ['entitydata %entity {}', 'execute as %0 run data get entity @s'],
        ['entitydata %entity %entity_nbt', 'execute as %0 run data merge entity @s %1'],
        ['execute %entity ~ ~ ~ %command', 'execute as %0 at @s run %1'],
        ['execute %entity %vec_3 %command', 'execute as %0 at @s positioned %1 run %2'],
        [
            'execute %entity ~ ~ ~ detect %vec_3 %word %word %command',
            'execute as %0 at @s if block %1 %2$addDataOrStateToBlock%3 run %4'
        ],
        [
            'execute %entity %vec_3 detect %vec_3 %word %word %command',
            'execute as %0 at @s positioned %1 if block %2 %3$addDataOrStateToBlock%4 run %5'
        ],
        ['fill %vec_3 %vec_3 %word', 'fill %0 %1 %2$fuckBlockItself'],
        ['fill %vec_3 %vec_3 %word %word', 'fill %0 %1 %2$addDataOrStateToBlock%3'],
        ['fill %vec_3 %vec_3 %word %word %literal', 'fill %0 %1 %2$addDataOrStateToBlock%3 %4'],
        [
            'fill %vec_3 %vec_3 %word %word %literal %block_nbt',
            'fill %0 %1 %2$addDataOrStateAndNbtToBlock%3%5 %4'
        ],
        [
            'fill %vec_3 %vec_3 %word %word replace %word',
            'fill %0 %1 %2$addDataOrStateToBlock%3 replace %4'
        ],
        [
            'fill %vec_3 %vec_3 %word %word replace %word %word',
            'fill %0 %1 %2$addDataOrStateToBlock%3 replace %4$addDataOrStateToBlock%5'
        ],
        ['function %word', 'function %0'],
        ['function %word %literal %entity', 'execute %1 entity %2 run function %0'],
        ['gamemode %word', 'gamemode %0'],
        ['gamemode %word %entity', 'gamemode %0 %1'],
        ['gamerule %word', 'gamerule %0'],
        [
            'gamerule gameLoopFunction %word',
            "# gamerule gameLoopFunction %0 !> Please add function %0 to function tag '#minecraft:tick'."
        ],
        ['gamerule %word %word', 'gamerule %0 %1'],
        ['give %entity %word', 'give %0 %1$fuckItemItself'],
        ['give %entity %word %num', 'give %0 %1$fuckItemItself %2'],
        ['give %entity %word %num %num', 'give %0 %1$addDataToItem%3 %2'],
        ['give %entity %word %num %num %item_tag_nbt', 'give %0 %1$addDataAndNbtToItem%3%4 %2'],
        ['help %string', '# help %0 !> Can\'t update help commands!'],
        ['kick %word', 'kick %0'],
        ['kick %word %string', 'kick %0 %1'],
        ['kill', 'kill @s'],
        ['kill %entity', 'kill %0'],
        ['list', 'list'],
        ['list %string', 'list %0'],
        ['locate Temple', 'locate Desert_Pyramid\nlocate Igloo\nlocate Jungle_Pyramid\nlocate Swamp_hut'],
        ['locate %word', 'locate %0'],
        ['me %string', 'me %0'],
        ['op %word', 'op %0'],
        ['pardon %word', 'pardon %0'],
        ['pardon-ip %word', 'pardon-ip %0'],
        ['particle %word %vec_3 %vec_3 %num', 'particle %0 %1 %2 %3'],
        ['particle %word %vec_3 %vec_3 %num %num', 'particle %0 %1 %2 %3 %4'],
        ['particle %word %vec_3 %vec_3 %num %num %literal', 'particle %0 %1 %2 %3 %4 %5'],
        ['particle %word %vec_3 %vec_3 %num %num %literal %entity', 'particle %0 %1 %2 %3 %4 %5 %6'],
        [
            'particle %word %vec_3 %vec_3 %num %num %literal %entity %num',
            'particle %0 %7 %1 %2 %3 %4 %5 %6'
        ],
        [
            'particle %word %vec_3 %vec_3 %num %num %literal %entity %num %num',
            'particle %0 %7 %1 %2 %3 %4 %5 %6'
        ],
        ['playsound %string %string %entity', 'playsound %0 %1 %2'],
        ['playsound %string %string %entity %vec_3', 'playsound %0 %1 %2 %3'],
        ['playsound %string %string %entity %vec_3 %num', 'playsound %0 %1 %2 %3 %4'],
        ['playsound %string %string %entity %vec_3 %num %num', 'playsound %0 %1 %2 %3 %4 %5'],
        ['playsound %string %string %entity %vec_3 %num %num %num', 'playsound %0 %1 %2 %3 %4 %5 %6'],
        ['publish', 'publish'],
        ['recipe %literal %word', 'recipe %0 %1'],
        ['recipe %literal %entity %word', 'recipe %0 %1 %2'],
        ['reload', 'reload'],
        ['replaceitem block %vec_3 %word %word', 'replaceitem block %0 %1 %2$fuckItemItself'],
        ['replaceitem block %vec_3 %word %word %num', 'replaceitem block %0 %1 %2$fuckItemItself %3'],
        ['replaceitem block %vec_3 %word %word %num %num', 'replaceitem block %0 %1 %2$addDataToItem%4 %3'],
        [
            'replaceitem block %vec_3 %word %word %num %num %item_tag_nbt',
            'replaceitem block %0 %1 %2$addDataAndNbtToItem%4%5 %3'
        ],
        ['replaceitem entity %entity %word %word', 'replaceitem block %0 %1 %2$fuckItemItself'],
        ['replaceitem entity %entity %word %word %num', 'replaceitem block %0 %1 %2$fuckItemItself %3'],
        ['replaceitem entity %entity %word %word %num %num', 'replaceitem block %0 %1 %2$addDataToItem%4 %3'],
        [
            'replaceitem entity %entity %word %word %num %num %item_tag_nbt',
            'replaceitem block %0 %1 %2$addDataAndNbtToItem%4%5 %3'
        ],
        ['save-all', 'save-all'],
        ['save-all %literal', 'save-all %0'],
        ['save-off', 'save-off'],
        ['save-on', 'save-on'],
        ['say %say_string', 'say %0'],
        ['scoreboard objectives list', 'scoreboard objectives list'],
        ['scoreboard objectives add %word %string', 'scoreboard objectives add %0 %1'],
        ['scoreboard objectives add %word %string %string', 'scoreboard objectives add %0 %1 %2'],
        ['scoreboard objectives remove %word', 'scoreboard objectives remove %0'],
        ['scoreboard objectives setdisplay %word', 'scoreboard objectives setdisplay %0'],
        ['scoreboard objectives setdisplay %word %word', 'scoreboard objectives setdisplay %0 %1'],
        ['scoreboard players %literal', 'scoreboard players %0'],
        ['scoreboard players %literal %entity', 'scoreboard players %0 %1'],
        ['scoreboard players %literal %entity %word', 'scoreboard players %0 %1 %2'],
        ['scoreboard players test %entity %word %num', 'execute if entity %0$addScbMinToEntity%1%2'],
        [
            'scoreboard players test %entity %word %num_or_star %num_or_star',
            'execute if entity %0$addScbMinToEntity%1%2$addScbMaxToEntity%1%3'
        ],
        [   
            'scoreboard players operation %entity %word %word %entity %word', 
            'scoreboard players operation %0 %1 %2 %3 %4'
        ],
        ['scoreboard players %literal %entity %word %num', 'scoreboard players %0 %1 %2 %3'],
        [
            'scoreboard players %literal %entity %word %num %entity_nbt',
            'scoreboard players %0 %1$addNbtToEntity%4 %2 %3'
        ],
        ['scoreboard players tag %entity list', 'tag %0 list'],
        ['scoreboard players tag %entity %literal %word', 'tag %0 %1 %2'],
        ['scoreboard players tag %entity %literal %word %entity_nbt', 'tag %0$addNbtToEntity%3 %1 %2'],
        ['scoreboard teams list', 'team list'],
        ['scoreboard teams list %word', 'team list %0'],
        ['scoreboard teams add %word', 'team add %0'],
        ['scoreboard teams add %word %string', 'team add %0 %1'],
        ['scoreboard teams remove %word', 'team remove %0'],
        ['scoreboard teams empty %word', 'team empty %0'],
        ['scoreboard teams join %word', 'team join %0'],
        ['scoreboard teams join %word %entity', 'team join %0 %1'],
        ['scoreboard teams leave', 'team leave'],
        ['scoreboard teams leave %entity', 'team leave %0'],
        ['scoreboard teams option %word %string %word', 'team modify %0 %1 %2'],
        ['seed', 'seed'],
        ['setblock %vec_3 %word', 'setblock %0 %1$fuckBlockItself'],
        ['setblock %vec_3 %word %word', 'setblock %0 %1$addDataOrStateToBlock%2'],
        ['setblock %vec_3 %word %word %literal', 'setblock %0 %1$addDataOrStateToBlock%2 %3'],
        [
            'setblock %vec_3 %word %word %literal %block_nbt',
            'setblock %0 %1$addDataOrStateAndNbtToBlock%2%4 %3'
        ],
        ['setidletimeout %num', 'setidletimeout %0'],
        ['setworldspawn', 'setworldspawn'],
        ['setworldspawn %vec_3', 'setworldspawn %0'],
        ['spawnpoint', 'spawnpoint'],
        ['spawnpoint %entity', 'spawnpoint %0'],
        ['spawnpoint %entity %vec_3', 'spawnpoint %0 %1'],
        ['spreadplayers %vec_2 %num %num %bool %entity', 'spreadplayers %0 %1 %2 %3 %4'],
        ['stats %string', "# stat %0 !> Use 'execute store ...'"],
        ['stop', 'stop'],
        ['stopsound %entity', 'stopsound %0'],
        ['stopsound %entity %string', 'stopsound %0 %1'],
        ['stopsound %entity %string %string', 'stopsound %0 %1 %2'],
        ['summon %entity_type', 'summon %0'],
        ['summon %entity_type %vec_3', 'summon %0 %1'],
        ['summon %entity_type %vec_3 %entity_nbt', 'summon %0 %1 %2'],
        ['teleport %entity %vec_3', 'teleport %0 %1'],
        ['teleport %entity %vec_3 %vec_2', 'teleport %0 %1 %2'],
        ['tell %entity %string', 'tell %0 %1'],
        ['msg %entity %string', 'msg %0 %1'],
        ['w %entity %string', 'w %0 %1'],
        ['tellraw %entity %json', 'tellraw %0 %1'],
        ['testfor %entity', 'execute if entity %0'],
        ['testfor %entity %entity_nbt', 'execute if entity %0$addNbtToEntity%1'],
        ['testforblock %vec_3 %word', 'execute if block %0 %1$fuckBlockItself'],
        ['testforblock %vec_3 %word %word', 'execute if block %0 %1$addDataOrStateToBlock%2'],
        [
            'testforblock %vec_3 %word %word %block_nbt',
            'execute if block %0 %1$addDataOrStateAndNbtToBlock%2%3'
        ],
        ['testforblocks %vec_3 %vec_3 %vec_3', 'execute if blocks %0 %1 %2 all'],
        ['testforblocks %vec_3 %vec_3 %vec_3 %literal', 'execute if blocks %0 %1 %2 %3'],
        ['time %literal %word', 'time %0 %1'],
        ['title %entity %word', 'title %0 %1'],
        ['title %entity %word %json', 'title %0 %1 %2'],
        ['title %entity times %num %num %num', 'title %0 times %1 %2 %3'],
        [
            'toggledownfall',
            "weather clear !> 'Toggledownfall' could toggle the weather, but 'weather clear' can only set the weather to clear."
        ],
        ['tp %entity', 'teleport %0'],
        ['tp %entity %entity', 'teleport %0 %1$setLimitOfSelector'],
        ['tp %vec_3', 'teleport %0'],
        ['tp %entity %vec_3', 'execute as %0 at @s run teleport @s %1'],
        ['tp %entity %vec_3 %vec_2', 'execute as %0 at @s run teleport @s %1 %2'],
        ['trigger %word %literal %num', 'trigger %0 %1 %2'],
        ['weather %literal', 'weather %0'],
        ['weather %literal %num', 'weather %0 %1'],
        ['whitelist %literal', 'whitelist %0'],
        ['whitelist %literal %entity', 'whitelist %0 %1'],
        ['worldborder add %num', 'worldborder add %0'],
        ['worldborder add %num %num', 'worldborder add %0 %1'],
        ['worldborder center %vec_2', 'worldborder center %0'],
        ['worldborder damage %literal %num', 'worldborder damage %0 %1'],
        ['worldborder get', 'worldborder get'],
        ['worldborder set %num', 'worldborder set %0'],
        ['worldborder set %num %num', 'worldborder set %0 %1'],
        ['worldborder warning %literal %num', 'worldborder warning %0 %1'],
        ['xp %num', 'experience add @s %0 points'],
        ['xp %num %entity', 'experience add %1 %0 points'],
        ['xp %word', 'experience add @s %0 levels'],
        ['xp %word %entity', 'experience add %1 %0 levels']
}
