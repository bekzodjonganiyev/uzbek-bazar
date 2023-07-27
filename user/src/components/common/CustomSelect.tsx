import {ReactElement} from "react"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    items: { label: string, value: string, icon?: ReactElement }[],
    defaultValue?: string,
    placeholderValue: string,
    width?: string,
    changeHandler: (args: string | number) => void
}

export const CustomSelect = ({ items, defaultValue, changeHandler, placeholderValue, width}: Props): ReactElement  => {
    return (
        <Select defaultValue={defaultValue ?? undefined} onValueChange={changeHandler}>
            <SelectTrigger className={width ?? "w-fit"}>
                <SelectValue placeholder={placeholderValue}/>
            </SelectTrigger>
            <SelectContent>
                {
                    items.map((item, idx) => (
                        <SelectItem 
                            key={idx} 
                            value={item.value} 
                        >
                            <p className="flex items-center gap-2"><span>{item.icon}</span>{item.label}</p>
                        </SelectItem>
                    ))
                }
            </SelectContent>
        </Select>

    )
}