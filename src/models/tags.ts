import { SortComparator, sort } from 'utils/array'

type Order = 'asc' | 'ascending' | 'desc' | 'descending'

export default class Tags {
  private _data: Record<string, number> = {}
  private _maxLength = 0

  public add(name: string, count: number) {
    if (this._maxLength < name.length) {
      this._maxLength = name.length
    }

    this._data[name] = (this._data[name] ?? 0) + count
  }

  public toString(order?: Order) {
    let names = Object.keys(this._data)

    if (order) {
      const comparator: SortComparator<string> = /^asc(ending)?$/.test(order)
        ? (a, b) => this._data[a] - this._data[b]
        : (a, b) => this._data[b] - this._data[a]

      names = sort(comparator, names)
    }

    return names.reduce(
      (acc, name, i) =>
        `${acc}${name.padEnd(this._maxLength + 2, ' ')}${this._data[name]}${
          i !== names.length - 1 ? '\n' : ''
        }`,
      ''
    )
  }
}
