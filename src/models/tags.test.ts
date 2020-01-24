import Tags from './tags'

describe('Tags', () => {
  describe('add', () => {
    it('should add the provided name associated with the provided count', () => {
      const tags = new Tags()

      expect(tags.toString()).toMatch('')

      tags.add('a', 1)

      expect(tags.toString()).toMatch(/a\s+1/)
    })

    it('should associate the sum of the provided count and the pre-existing count to the pre-existing name', () => {
      const tags = new Tags()

      expect(tags.toString()).toMatch('')

      tags.add('a', 1)
      tags.add('a', 9)

      expect(tags.toString()).toMatch(/a\s+10/)
    })
  })

  describe('toString', () => {
    it('should return a formatted string of names and associated counts', () => {
      const tags = new Tags()

      tags.add('b', 300)
      tags.add('a', 1)
      tags.add('c', 20)

      expect(tags.toString()).toMatchInlineSnapshot(`
        b  300
        a  1
        c  20
      `)
    })

    it('should return a formatted string of names and associated counts in ascending order', () => {
      const tags = new Tags()

      tags.add('b', 300)
      tags.add('a', 1)
      tags.add('c', 20)

      expect(tags.toString('asc')).toMatchInlineSnapshot(`
        a  1
        c  20
        b  300
      `)
    })

    it('should return a formatted string of names and associated counts in descending order', () => {
      const tags = new Tags()

      tags.add('b', 300)
      tags.add('a', 1)
      tags.add('c', 20)

      expect(tags.toString('desc')).toMatchInlineSnapshot(`
        b  300
        c  20
        a  1
      `)
    })
  })
})
