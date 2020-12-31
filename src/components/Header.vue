<template>
    <div>
        <p>
            Welcome, {{username}}!
        </p>
        <Nav />
    </div>
</template>

<script>
import Nav from './Nav';

export default {
    name: 'Header',
    components: {
        Nav: Nav
    },
    props: ['username']
}
</script>