type Get<C> = {
  [P in keyof C]: C[P] extends (...args: any) => any ? ReturnType<C[P]> : never
}
type Options<D, C, M> = {
  data: (this: void) => D
  computed: C
  methods: M
} & ThisType<D & M & Get<C>>
declare function SimpleVue<D, C, M>(options: Options<D, C, M>): unknown

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: "Type",
      lastname: "Challenges",
      amount: 10
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    }
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.amount)
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
    }
  }
})

type VueOptions<D, M> = {
  data: (this: void) => D
  methods: M
} & ThisType<D & M>
declare function Vue<D, M>(options: VueOptions<D, M>): unknown

Vue({
  data() {
    return {
      a: 0
    }
  },
  methods: {
    test() {
      return [this.a]
    },
    test1() {
      this.test()[0]
    }
  }
})
