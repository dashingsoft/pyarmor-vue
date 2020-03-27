ver=$1

if [[ "$ver" == "" ]] ; then
  echo No version
  exit 1
fi

echo "Change version to: $ver"
for x in package.json package-lock.json; do
  echo "Patch $x"
  sed -i -e "1,5s/[0-9].[0-9].[0-9]/$ver/" $x
done

x=src/components/HomeTabAbout.vue
echo "Patch $x"
sed -i -e "s/<p>pyarmor-vue:.*</<p>pyarmor-vue: $ver</" $x

git commit -m"Change version to $ver" $x package.json package-lock.json
