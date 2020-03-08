<template>
  <div class="wrapper">
    <h2>Recipes</h2>
    <div class="user-recipes">
      <div class="user-recipe" v-for="(recipe, index) in recipes" :key="index">
        <h3>{{ recipe.name }}</h3>
        <h4>Ingredients:</h4>
        <ul>
          <li
            class="ingredient"
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
          >{{ ingredient }}</li>
        </ul>
        <h4>Directions:</h4>
        <p>{{ recipe.directions }}</p>
        <p>by: {{ recipe.creator.username }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipes: ""
    };
  },
  mounted() {
    var self = this;
    fetch("/api/", { method: "get" })
      .then(resp => resp.json())
      .then(data => {
        self.recipes = data;
      });
  }
};
</script>

<style lang="scss" scoped>
</style>
