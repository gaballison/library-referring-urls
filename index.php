<?php require('header.php'); ?>
<?php include('fxn.php'); ?>

	<h2 id="pageTitle"> </h2>

	<p>Enter your library card number below to be able to access <span id="dbTitle" class="text-muted"></span> from home!</p>

	<form id="libBarcode"> 
		<div class="form-group row">
			<label for="inputBarcode" class="col-sm-3 col-form-label" id="ibLabel"><strong>Library Card #:</strong></label>
			<div class="col-sm-7">
				<input type="number" class="form-control" id="inputBarcode" required />
				<!-- checks the query string in the URL -->
				<input type="hidden" id="inputDB" name="inputDB" value="<?php echo checkDBCode($query); ?>" />
				<input type="hidden" id="inputVal" name="inputVal" value=""/>
			</div>
			<div class="col-sm-2 clearfix" id="subButton">
				<button id="turn" type="submit" class="btn btn-primary btn-large btn-block">Log In</button>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-3">&nbsp;</div>
			<!-- where any error messages will appear -->
			<div class="col-sm-7" id="bcErr"></div>
			<div class="col-sm">&nbsp;</div>
		</div>
	</form>	

<?php require('footer.php'); ?>
