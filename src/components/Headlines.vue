<template>

  <div>

    <div
      class="detail__contentsection"
      v-for="(name, nameKey) in Object.keys(scanner)"
      :key="nameKey"
      :id="`${id}_${scanner[name].scanner_code}`">

      <h4>
        {{ scanner[name].scanner_name }} [{{ scanner[name].scanner_code }}]
      </h4>

      <div
        class="contentsection__accordion"
        v-for="(headline, headlineKey) in Object.keys(scanner[name])"
        :key="headlineKey">

        <div v-if="headline !== 'scanner_name' && headline !== 'scanner_code'">

          <ScannerContentToggle
            class="accordion__item active"
            :scanner="scanner"
            :headline="headline"
            :name="name" />

        </div>

      </div>

    </div>

  </div>

</template>

<script>
import ScannerContentToggle from './ScannerContentToggle'
export default {
  name: 'Headlines',
  components: { ScannerContentToggle },
  props: {
    scanner: {
      type: Object
    },
    id: {
      type: String
    }
  }
}
</script>
