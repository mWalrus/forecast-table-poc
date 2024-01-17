# Forecast Table Update

## Why?
The current version of the forecast table in 10jobstool is clunky, overly complicated and looks sub-par.
It uses a bunch of z-index, "after" css pseudo-elements, and more unnecessary styling in order to accomplish a less than stellar result.
We have run into issues stemming from these over complications now when we are revamping benefits, and I decided that we should create a
better version of the current implementation.

This POC is a simplified, more robust and better looking refresher of this table in order to allow for easier updates and more unified data
distribution across components. We have broken up components into pieces that make sense and are both easy to use and understand. This is
done without taking away from the general visual design and usability of the table from an end-user perspective.


## Additional Possible Improvements
- This implementation currently mimicks the data returned from the backend which has the old forecast table implementation in mind just to make implementation of this
version into the current system more of a plug-and-play experience. However, we could also modify the data aggregation in the backend to make it easier to use with
this new table version.
- Currently, this implementation starts behaving a little funky whenever the viewport gets too small (around 720px in the Y direction and 500px in the X direction).
This has to be fixed before we consider implementing this new version.

