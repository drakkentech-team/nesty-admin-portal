import HelloWorld from "./HelloWorld.vue"
import { mount } from "@vue/test-utils"

describe("HelloWorld", () => {
    it("renders properly", () => {
        const wrapper = mount(HelloWorld, { props: { msg: "Hello Jest" } })

        expect(wrapper.text()).toContain("Hello Jest")
    })
})
